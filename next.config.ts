import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/base";

// Static export hosted as a section of shatalov.dev (a static site) under BASE_PATH.
// - output "export": emit a fully static site to out/ (no Node server).
// - basePath: every route + _next asset is served under /case-studies/underwriting-portal.
// - trailingSlash: directory-style URLs so relative links resolve on a static host.
// - images.unoptimized: required for static export (no image optimization server).
const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
