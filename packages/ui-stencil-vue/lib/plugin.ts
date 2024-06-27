import { Plugin } from "vue";
import { applyPolyfills, defineCustomElements } from "ui-stencil/loader";

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};

// packages/vue-library/lib/index.ts
export * from "./components";
export * from "./plugin";
