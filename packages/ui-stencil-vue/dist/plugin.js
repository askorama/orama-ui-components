import { applyPolyfills, defineCustomElements } from "ui-stencil/loader";
export const ComponentLibrary = {
    async install() {
        applyPolyfills().then(() => {
            defineCustomElements();
        });
    },
};
export * from "./components";
export * from "./plugin";
//# sourceMappingURL=plugin.js.map