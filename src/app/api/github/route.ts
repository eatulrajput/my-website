import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'eatulrajput';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'GITHUB_TOKEN environment variable is not set.' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const yearParam = searchParams.get('year');
  
  let fromDate = new Date();
  let toDate = new Date();
  
  if (yearParam) {
    fromDate = new Date(`${yearParam}-01-01T00:00:00Z`);
    toDate = new Date(`${yearParam}-12-31T23:59:59Z`);
  } else {
    // Default to last 52 weeks if no year specified
    fromDate.setDate(toDate.getDate() - (52 * 7));
  }

  const GITHUB_GRAPHQL_QUERY = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        followers {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          nodes {
            stargazerCount
          }
        }
        contributionsCollection {
          contributionYears
        }
        calendar: contributionsCollection(from: "${fromDate.toISOString()}", to: "${toDate.toISOString()}") {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
      search(query: "author:${GITHUB_USERNAME} type:pr is:merged merged:${fromDate.toISOString().substring(0,10)}..${toDate.toISOString().substring(0,10)}", type: ISSUE, first: 1) {
        issueCount
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: GITHUB_GRAPHQL_QUERY }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'GraphQL Error');
    }

    const user = data.data.user;
    
    // Calculate total stars
    const stars = user.repositories.nodes.reduce(
      (acc: number, repo: { stargazerCount: number }) => acc + repo.stargazerCount,
      0
    );

    // Extract stats
    const stats = {
      followers: user.followers.totalCount,
      stars: stars,
      commits: user.calendar.totalCommitContributions,
      prs: data.data.search.issueCount,
    };

    const availableYears = user.contributionsCollection.contributionYears;

    // Extract contribution graph (flatten to an array of weeks containing arrays of intensities)
    const allWeeks = user.calendar.contributionCalendar.weeks;
    
    // Map contribution count to our intensity scale (0-4)
    // Find max contribution to scale relative to the user's activity
    let maxCount = 1;

    interface ContributionDay {
      contributionCount: number;
      date: string;
    }

    interface ContributionWeek {
      contributionDays: ContributionDay[];
    }

    allWeeks.forEach((week: ContributionWeek) => {
      week.contributionDays.forEach((day: ContributionDay) => {
        if (day.contributionCount > maxCount) maxCount = day.contributionCount;
      });
    });

    const getIntensity = (count: number) => {
      if (count === 0) return 0;
      const ratio = count / maxCount;
      if (ratio <= 0.25) return 1;
      if (ratio <= 0.5) return 2;
      if (ratio <= 0.75) return 3;
      return 4;
    };

    const contributionWeeks = allWeeks.map((week: ContributionWeek) => {
      // GraphQL might return less than 7 days for the first/last week of the year
      // Pad with default empty days
      const days = new Array(7).fill(null).map(() => ({ intensity: 0, count: 0, date: '' }));
      let month = 0;
      
      week.contributionDays.forEach((day: ContributionDay, index: number) => {
        const dateObj = new Date(day.date);
        const dayOfWeek = dateObj.getDay();
        
        days[dayOfWeek] = {
          intensity: getIntensity(day.contributionCount),
          count: day.contributionCount,
          date: day.date
        };
        
        // Use the month of the first available day in the week
        if (index === 0) {
          month = dateObj.getMonth();
        }
      });
      return { month, days };
    });

    return NextResponse.json({ stats, contributionWeeks, availableYears });
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}
