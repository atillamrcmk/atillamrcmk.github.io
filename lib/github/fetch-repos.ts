export interface GitHubRepoMeta {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string | null;
  topics: string[];
}

function parseRepo(repo: string): { owner: string; name: string } | null {
  const cleaned = repo.trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\.git$/, "");
  const [owner, name] = cleaned.split("/").filter(Boolean);
  if (!owner || !name) return null;
  return { owner, name };
}

/**
 * Build-time GitHub metadata fetch.
 * Never throws to callers — returns null on any failure.
 */
export async function fetchGitHubRepoMeta(
  repo: string | undefined
): Promise<GitHubRepoMeta | null> {
  if (!repo) return null;
  const parsed = parseRepo(repo);
  if (!parsed) return null;

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "atillamrcmk-portfolio",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/repos/${parsed.owner}/${parsed.name}`,
      {
        headers,
        // Static export: fetch once at build time
        cache: "force-cache",
      }
    );

    if (!res.ok) return null;
    const data = (await res.json()) as {
      name?: string;
      html_url?: string;
      description?: string | null;
      language?: string | null;
      stargazers_count?: number;
      forks_count?: number;
      updated_at?: string;
      topics?: string[];
    };

    if (!data.html_url || !data.name) return null;

    return {
      name: data.name,
      url: data.html_url,
      description: data.description ?? null,
      language: data.language ?? null,
      stars: typeof data.stargazers_count === "number" ? data.stargazers_count : 0,
      forks: typeof data.forks_count === "number" ? data.forks_count : 0,
      updatedAt: data.updated_at ?? null,
      topics: Array.isArray(data.topics) ? data.topics : [],
    };
  } catch {
    return null;
  }
}

export async function fetchGitHubMetaMap(
  repos: Array<string | undefined>
): Promise<Record<string, GitHubRepoMeta>> {
  const unique = [...new Set(repos.filter(Boolean) as string[])];
  const entries = await Promise.all(
    unique.map(async (repo) => {
      const meta = await fetchGitHubRepoMeta(repo);
      return meta ? ([repo, meta] as const) : null;
    })
  );

  const map: Record<string, GitHubRepoMeta> = {};
  for (const entry of entries) {
    if (entry) map[entry[0]] = entry[1];
  }
  return map;
}
