import { defineCustomElements } from "./../../../packages/ui-stencil/loader";

defineCustomElements();

/** @type { import('@storybook/html').Preview } */
const preview = {
  tags: ["autodocs"],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
