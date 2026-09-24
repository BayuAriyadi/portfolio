import type { APIRoute } from 'astro';

// ============================================================
// GitHub Stats API — Public data, no auth needed
// ============================================================

const GITHUB_USERNAME = 'bayuariyadi';
const CACHE = { data: null as any, ts: 0 };

export const GET: APIRoute = async () => {
  const now = Date.now();
  if (CACHE.data && now - CACHE.ts < 300_000) {
    return json(CACHE.data, 300);
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { 'User-Agent': 'portfolio-bot' },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
        headers: { 'User-Agent': 'portfolio-bot' },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API failed');

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Language frequency across repos
    const langMap: Record<string, number> = {};
    let totalStars = 0;
    for (const r of repos) {
      totalStars += r.stargazers_count ?? 0;
      if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
    }
    const topLangs = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    // Top 5 repos by stars
    const topRepos = [...repos]
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        description: r.description ?? '',
        stars: r.stargazers_count ?? 0,
        language: r.language ?? '',
        url: r.html_url,
      }));

    const data = {
      followers: user.followers,
      publicRepos: user.public_repos,
      totalStars,
      topLangs,
      topRepos,
      profileUrl: user.html_url,
    };

    CACHE.data = data;
    CACHE.ts = now;
    return json(data, 300);
  } catch {
    return json({ error: 'GitHub API unavailable' }, 60);
  }
};

function json(data: unknown, maxAge: number) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`,
    },
  });
}
