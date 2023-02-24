const withTM = require("next-transpile-modules")(["lib"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  ...withTM({
    reactStrictMode: true,
  }),
};

module.exports = nextConfig;
