// Quick script to fetch and inspect GitHub contributions HTML structure
const url = "https://github.com/users/eatulrajput/contributions?from=2026-01-01&to=2026-12-31";

fetch(url, {
  headers: {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    "Accept": "text/html",
  },
})
  .then((res) => res.text())
  .then((html) => {
    // Find all td elements with data-date
    const tdRegex = /<td[^>]*data-date[^>]*>/g;
    const matches = [];
    let m;
    while ((m = tdRegex.exec(html)) !== null) {
      matches.push(m[0]);
    }
    console.log("=== Total td cells found:", matches.length);
    console.log("\n=== First 10 td cells ===");
    matches.slice(0, 10).forEach((td, i) => console.log(`[${i}]`, td));

    // Find all tool-tip elements
    const tooltipRegex = /<tool-tip[^>]*>[^<]*<\/tool-tip>/g;
    const tooltips = [];
    let t;
    while ((t = tooltipRegex.exec(html)) !== null) {
      tooltips.push(t[0]);
    }
    console.log("\n=== Total tooltips found:", tooltips.length);
    console.log("\n=== First 10 tooltips ===");
    tooltips.slice(0, 10).forEach((tip, i) => console.log(`[${i}]`, tip));

    // Try to find any other patterns for counts
    console.log("\n=== Searching for 'contribution' text patterns ===");
    const contribRegex = /\d+ contributions? on [A-Z][a-z]+ \d+/g;
    const contribs = [];
    let c;
    while ((c = contribRegex.exec(html)) !== null) {
      contribs.push(c[0]);
    }
    console.log("Found:", contribs.length);
    contribs.slice(0, 10).forEach((cr, i) => console.log(`[${i}]`, cr));

    // Check for any data-count attributes
    const dataCountRegex = /data-count="[^"]*"/g;
    const dataCounts = [];
    let dc;
    while ((dc = dataCountRegex.exec(html)) !== null) {
      dataCounts.push(dc[0]);
    }
    console.log("\n=== data-count attributes found:", dataCounts.length);
    dataCounts.slice(0, 10).forEach((d, i) => console.log(`[${i}]`, d));

    // Show a sample of raw HTML around first td
    const firstTdIdx = html.indexOf("<td ");
    if (firstTdIdx > -1) {
      console.log("\n=== Raw HTML around first <td> (500 chars) ===");
      console.log(html.substring(firstTdIdx, firstTdIdx + 500));
    }
  })
  .catch((err) => console.error("Error:", err));
