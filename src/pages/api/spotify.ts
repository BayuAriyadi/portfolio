import type { APIRoute } from 'astro';

// ============================================================
// Spotify Now Playing API
// ============================================================
// Env vars needed (set in astro.config.mjs → vite.define or .env):
//   SPOTIFY_CLIENT_ID
//   SPOTIFY_CLIENT_SECRET
//   SPOTIFY_REFRESH_TOKEN
//
// Setup flow:
// 1. Create app at https://developer.spotify.com/dashboard
// 2. Set redirect URI to http://localhost:4321/spotify/callback
// 3. Authorize: https://accounts.spotify.com/authorize?client_id=...&response_type=code&redirect_uri=http://localhost:4321/spotify/callback&scope=user-read-currently-playing
// 4. Exchange code for refresh token (see /api/spotify/callback endpoint)
// 5. Set SPOTIFY_REFRESH_TOKEN env var

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

async function getAccessToken(): Promise<string> {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !refreshToken) {
    throw new Error('SPOTIFY_NOT_CONFIGURED');
  }

  const credentials = btoa(`${clientId}:${clientSecret ?? ''}`);

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) throw new Error('TOKEN_REFRESH_FAILED');
  const json = await res.json();
  return json.access_token;
}

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const token = await getAccessToken();
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 204 = nothing playing
    if (res.status === 204) {
      return json({ isPlaying: false, track: null });
    }

    if (!res.ok) throw new Error('SPOTIFY_API_ERROR');

    const body = await res.json();
    const track = body?.item;
    if (!track) {
      return json({ isPlaying: false, track: null });
    }

    const data = {
      isPlaying: body.is_playing,
      track: {
        name: track.name,
        artist: track.artists?.[0]?.name ?? 'Unknown',
        album: track.album?.name ?? '',
        albumArt: track.album?.images?.[0]?.url ?? '',
        url: track.external_urls?.spotify ?? '',
        progressMs: body.progress_ms ?? 0,
        durationMs: track.duration_ms ?? 1,
      },
    };

    return json(data);
  } catch (err: any) {
    if (err.message === 'SPOTIFY_NOT_CONFIGURED') {
      return json({ isPlaying: false, track: null, configured: false });
    }
    return json({ isPlaying: false, track: null, error: true });
  }
};

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
