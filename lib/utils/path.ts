/**
 * Base path for the application.
 * In production (GitHub Pages), this should be the repository name.
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "" : "";

/**
 * Prepends the base path to a given path.
 * Useful for images and other static assets.
 * 
 * @param path The path to prefix (e.g., "/data/image.png")
 * @returns The path with the base path prepended (e.g., "/test/data/image.png")
 */
export function getPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  // Ensure path starts with / if not present (unless empty)
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${BASE_PATH}${normalizedPath}`;
}
