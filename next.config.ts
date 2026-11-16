import type { NextConfig } from "next";

// Site 100% estático: `npm run build` gera a pasta `out/`,
// que pode ser publicada em qualquer hospedagem de arquivos.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
