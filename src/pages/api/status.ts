import type { APIRoute } from 'astro';

// ============================================================
// Live Server Status API
// ============================================================
// Calls a lightweight status endpoint on the homelab.
// The homelab runs a tiny agent on port 8042 that returns JSON:
//   { uptime, cpu, memory, disk, hostname, load }
//
// Set HOMELAB_STATUS_URL env var (default: http://192.168.1.101:8042)
// If unreachable, returns cached data or offline status.

const DEFAULT_URL = 'http://192.168.1.101:8042';
const CACHE = { data: null as any, ts: 0 };

export const GET: APIRoute = async () => {
  const now = Date.now();
  if (CACHE.data && now - CACHE.ts < 20_000) {
    return json(CACHE.data);
  }

  const url = import.meta.env.HOMELAB_STATUS_URL || DEFAULT_URL;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'portfolio-status-check' },
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error('Status endpoint returned non-200');

    const body = await res.json();
    const data = {
      online: true,
      hostname: body.hostname ?? 'homelab',
      uptime: body.uptime ?? '',
      cpu: {
        model: body.cpu?.model ?? 'Unknown',
        cores: body.cpu?.cores ?? 0,
        usagePercent: body.cpu?.usagePercent ?? 0,
      },
      memory: {
        usedGB: body.memory?.usedGB ?? 0,
        totalGB: body.memory?.totalGB ?? 0,
        percent: body.memory?.percent ?? 0,
      },
      disk: {
        usedGB: body.disk?.usedGB ?? 0,
        totalGB: body.disk?.totalGB ?? 0,
        percent: body.disk?.percent ?? 0,
      },
      load: body.load ?? [0, 0, 0],
      services: body.services ?? [],
      lastChecked: new Date().toISOString(),
    };

    CACHE.data = data;
    CACHE.ts = now;
    return json(data);
  } catch {
    // Return offline state
    const data = {
      online: false,
      hostname: 'homelab',
      lastChecked: new Date().toISOString(),
    };
    CACHE.data = data;
    CACHE.ts = now;
    return json(data);
  }
};

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, s-maxage=10',
    },
  });
}
