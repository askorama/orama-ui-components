import { defineConfig, type Options } from "tsup";
// @ts-ignore - We need to find out why ts is complaining about node bult in deps not being found
import { copyFileSync } from "node:fs";
// @ts-ignore - We need to find out why ts is complaining about node bult in deps not being found
import { join } from "node:path";
export default defineConfig((options): Options => {
  const source = join("../ui-stencil/dist/orama-ui/orama-ui.css");
  const destination = join("./src/orama-ui.css");

  // Copy the file
  copyFileSync(source, destination);
  console.log(`File copied from ${source} to ${destination}`);

  return {
    entry: ["src/index.ts", "src/orama-ui.css"],
    format: ["cjs", "esm"],
    target: "esnext",
    dts: true,
    sourcemap: true,
    splitting: true,
    clean: true,
    minify: !options.watch,
    outDir: "dist",
    external: ["react", "react-dom"],
    injectStyle: true,
  };
});
