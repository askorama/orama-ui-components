import { defineConfig, type Options } from "tsup";
import { copyFileSync } from "node:fs";
import { join } from "node:path";

export default defineConfig((options): Options => {
  const source = join("../ui-stencil/dist/orama-ui/orama-ui.css");
  const destination = join("./src/orama-ui.css");

  // Copy the file
  copyFileSync(source, destination);
  console.log(`File copied from ${source} to ${destination}`);

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
