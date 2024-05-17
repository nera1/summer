const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: isProd ? "/myproject" : "",
  basePath: isProd ? "/myproject" : "",
};

export default nextConfig;
