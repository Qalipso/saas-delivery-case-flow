// Single source of truth for the deploy base path.
// The case study is hosted as a static section under shatalov.dev/case-studies/underwriting-portal.
// next.config (basePath) and runtime asset references both read from here so they never drift.
export const BASE_PATH = "/case-studies/underwriting-portal";

// Prefix a root-relative public asset path with the base path.
// Next auto-prefixes <Link>/<Image>/_next assets, but NOT raw <a href> / <iframe src> strings.
export const asset = (path: string): string => `${BASE_PATH}${path}`;
