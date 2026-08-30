import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://github.com/users/eatulrajput/contributions?from=2026-01-01&to=2026-12-31";
  
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        "Accept": "text/html",
      },
    });
    const html = await res.text();

    // Extract td tags with data-date
    const tdRegex = /<td[^>]*data-date[^>]*>/g;
    const tds: string[] = [];
    let m;
    while ((m = tdRegex.exec(html)) !== null && tds.length < 10) {
      tds.push(m[0]);
    }

    // Check for tool-tip elements
    const tooltipRegex = /<tool-tip[^>]*>[\s\S]*?<\/tool-tip>/g;
    const tooltips: string[] = [];
    let t;
    while ((t = tooltipRegex.exec(html)) !== null && tooltips.length < 10) {
      tooltips.push(t[0]);
    }

    // Grab a raw 2000-char snippet around first data-date
    const idx = html.indexOf("data-date");
    const snippet = idx > -1 ? html.substring(Math.max(0, idx - 100), idx + 1900) : "data-date not found";

    return NextResponse.json({
      htmlLength: html.length,
      hasDataCount: html.includes("data-count"),
      hasDataLevel: html.includes("data-level"),
      hasDataDate: html.includes("data-date"),
      tdSamples: tds,
      tooltipSamples: tooltips,
      rawSnippet: snippet,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
