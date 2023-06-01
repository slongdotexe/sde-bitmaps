import type { Options } from "tsup";

const env = process.env.NODE_ENV;

const config: Options = {
  splitting: true,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  minify: env === "production",
  bundle: env === "production",
  skipNodeModulesBundle: true,
  entryPoints: ["src/index.ts"],
  watch: env === "development",
  target: "esnext",
  tsconfig: "tsconfig.json",
  outDir: env === "production" ? "dist" : "lib",
  entry: ["src/**/*.ts"],
};

export default config;
