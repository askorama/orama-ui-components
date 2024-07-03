import { defineCustomElements } from "./../../../packages/ui-stencil/loader";
import "ui-stencil/dist/orama-ui/orama-ui.css";

defineCustomElements();

/** @type { import('@storybook/html').Preview } */
const preview = {
  tags: ["autodocs"],
  decorators: [(story) => `<div id="orama-ui">${story()}</div>`],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
