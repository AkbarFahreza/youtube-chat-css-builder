let cachedFonts = null;
let lastFetched = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export async function GET() {
  const now = Date.now();

  if (cachedFonts && now - lastFetched < CACHE_DURATION) {
    return Response.json(cachedFonts);
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY}`
    );

    const data = await res.json();
    cachedFonts = data.items;
    lastFetched = now;

    return Response.json(cachedFonts);
  } catch (e) {
    return new Response("Failed to fetch fonts", { status: 500 });
  }
}
