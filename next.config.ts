import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // GitHub Pages için basePath (username.github.io için boş bırakın, proje sayfası için repository adı)
  basePath: "",
  assetPrefix: "",
};

export default nextConfig;
