import { NextResponse } from "next/server";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionDataResponse {
  username: string;
  year: number;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  activeDaysCount: number;
  contributions: ContributionDay[];
  error?: string;
}

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

/**
 * Parse GitHub's contribution HTML to extract exact daily counts.
 *
 * GitHub's current HTML structure (as of 2026):
 * - <td ... data-date="2026-01-04" id="contribution-day-component-0-1" data-level="1" ...></td>
 * - <tool-tip ... for="contribution-day-component-0-1" ...>1 contribution on January 4th.</tool-tip>
 *
 * Key facts:
 * - `data-count` does NOT exist on <td> elements
 * - Exact counts must be extracted from <tool-tip> text content
 * - Tooltip text format: "N contribution(s) on Month DDth." or "No contributions on Month DDth."
 * - Tooltip `for` attribute matches the <td> `id` attribute
 */
function parseGitHubHTMLContributions(html: string, year: number): ContributionDay[] {
  // Step 1: Build a map from td element id -> { date, level }
  const tdMap = new Map<string, { date: string; level: number }>();
  const tdRegex = /<td[^>]*\bid="([^"]+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"[^>]*>/g;
  // Also handle reversed attribute order
  const tdRegex2 = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*\bid="([^"]+)"[^>]*data-level="(\d)"[^>]*>/g;

  let m;
  while ((m = tdRegex.exec(html)) !== null) {
    const id = m[1];
    const date = m[2];
    const level = parseInt(m[3], 10);
    if (date.startsWith(String(year))) {
      tdMap.set(id, { date, level });
    }
  }
  while ((m = tdRegex2.exec(html)) !== null) {
    const date = m[1];
    const id = m[2];
    const level = parseInt(m[3], 10);
    if (date.startsWith(String(year)) && !tdMap.has(id)) {
      tdMap.set(id, { date, level });
    }
  }

  // Step 2: Build a map from td element id -> exact count from <tool-tip> text
  const countByTdId = new Map<string, number>();
  // Match: <tool-tip ... for="contribution-day-component-X-Y" ...>N contribution(s) on ...</tool-tip>
  // or: <tool-tip ... for="contribution-day-component-X-Y" ...>No contributions on ...</tool-tip>
  const tooltipRegex = /<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;

  while ((m = tooltipRegex.exec(html)) !== null) {
    const forId = m[1];
    const text = m[2].trim();

    if (text.startsWith("No ")) {
      countByTdId.set(forId, 0);
    } else {
      const countMatch = text.match(/^([\d,]+)\s+contributions?/);
      if (countMatch) {
        countByTdId.set(forId, parseInt(countMatch[1].replace(/,/g, ""), 10));
      }
    }
  }

  // Step 3: Merge td data with exact counts from tooltips
  const days: ContributionDay[] = [];

  for (const [id, { date, level }] of tdMap) {
    const exactCount = countByTdId.get(id);
    const count = exactCount !== undefined ? exactCount : 0;
    const finalLevel = exactCount !== undefined ? getLevel(count) : (level as 0 | 1 | 2 | 3 | 4);

    days.push({
      date,
      count,
      level: finalLevel,
    });
  }

  days.sort((a, b) => a.date.localeCompare(b.date));
  return days;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "eatulrajput";
  const currentYear = new Date().getFullYear();
  const yearParam = searchParams.get("year");
  const year = yearParam ? parseInt(yearParam, 10) : currentYear;

  // 1. Primary Source: Fetch direct official GitHub HTML contribution page
  try {
    const githubUrl = `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`;
    const res = await fetch(githubUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const htmlText = await res.text();
      const days = parseGitHubHTMLContributions(htmlText, year);

      if (days.length > 0) {
        let totalContributions = 0;
        let activeDaysCount = 0;
        let tempStreak = 0;
        let longestStreak = 0;

        days.forEach((d) => {
          totalContributions += d.count;
          if (d.count > 0) {
            activeDaysCount++;
            tempStreak++;
            if (tempStreak > longestStreak) longestStreak = tempStreak;
          } else {
            tempStreak = 0;
          }
        });

        let currentStreak = 0;
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].count > 0) {
            currentStreak++;
          } else if (currentStreak > 0) {
            break;
          }
        }

        return NextResponse.json({
          username,
          year,
          totalContributions,
          currentStreak,
          longestStreak,
          activeDaysCount,
          contributions: days,
        });
      }
    }
  } catch (err) {
    console.error("GitHub direct scrape failed:", err);
  }

  // 2. Secondary Source: GitHub Contributions JSON API
  try {
    const jsonApiUrl = `https://github-contributions-api.johanncommayet.com/v1/${username}`;
    const res = await fetch(jsonApiUrl, { next: { revalidate: 3600 } });

    if (res.ok) {
      const data = await res.json();
      const rawYears = data?.years || [];
      const yearObj = rawYears.find((y: { year: string | number }) => String(y.year) === String(year));

      if (yearObj && Array.isArray(yearObj.days)) {
        let totalContributions = 0;
        let activeDaysCount = 0;
        let tempStreak = 0;
        let longestStreak = 0;

        const contributions: ContributionDay[] = yearObj.days.map((day: { date: string; count: number }) => {
          const count = day.count || 0;
          totalContributions += count;
          if (count > 0) {
            activeDaysCount++;
            tempStreak++;
            if (tempStreak > longestStreak) longestStreak = tempStreak;
          } else {
            tempStreak = 0;
          }
          return {
            date: day.date,
            count,
            level: getLevel(count),
          };
        });

        let currentStreak = 0;
        for (let i = contributions.length - 1; i >= 0; i--) {
          if (contributions[i].count > 0) {
            currentStreak++;
          } else if (currentStreak > 0) {
            break;
          }
        }

        return NextResponse.json({
          username,
          year,
          totalContributions,
          currentStreak,
          longestStreak,
          activeDaysCount,
          contributions,
        });
      }
    }
  } catch (err) {
    console.error("GitHub JSON API failed:", err);
  }

  // Return explicit error status if live GitHub data cannot be fetched
  return NextResponse.json(
    {
      error: `Could not fetch live GitHub contribution data for @${username}. Please verify internet connection or try again later.`,
    },
    { status: 502 }
  );
}
