import { defineConfig, type Options } from "tsup";

export default defineConfig((options): Options => {
  return {
    entry: ["src/**/*.ts"],
    format: ["cjs", "esm"],
    target: "esnext",
    dts: true,
    sourcemap: true,
    splitting: true,
    clean: true,
    minify: !options.watch,
    outDir: "dist",
    external: ["react", "react-dom"],
  };
});
