/** Site path prefix: "/Profile_Portfolio" on GitHub Pages, "" everywhere else (set in next.config.ts). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a /public path (image, audio, video) so it resolves under the basePath. Links via next/link don't need this. */
export const asset = (path: string) => `${basePath}${path}`;
