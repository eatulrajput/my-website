import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        // Use a generic user agent to prevent basic blocking
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      next: {
        revalidate: 86400 // cache for 24 hours
      }
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }

    const html = await res.text();
    // Parse title using regex
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    let title = titleMatch ? titleMatch[1].trim() : '';

    // If no title found, fallback to hostname
    if (!title || title.length < 2) {
       title = new URL(url).hostname;
    }

    // Decode HTML entities in a simple way
    title = title
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–');

    return NextResponse.json({ title });
  } catch (error) {
    // Return hostname as fallback on error
    try {
      return NextResponse.json({ title: new URL(url).hostname }, { status: 200 });
    } catch (e) {
      return NextResponse.json({ title: url }, { status: 200 });
    }
  }
}
