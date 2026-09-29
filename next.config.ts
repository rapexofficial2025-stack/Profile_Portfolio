import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>/ and can only host static files, so the Actions build exports a static
// site under that basePath. Locally (next dev / next start) it stays a normal server app, so /api/hearts works.
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isPagesBuild = Boolean(process.env.GITHUB_ACTIONS && repositoryName);
const basePath = isPagesBuild ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPagesBuild && { output: "export", trailingSlash: true, basePath, images: { unoptimized: true } }),
};

export default nextConfig;
