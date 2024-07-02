import { defineCustomElements } from "./../../../packages/ui-stencil/loader";
import "./../../../packages/ui-stencil/dist/orama-ui/orama-ui.css";

defineCustomElements();

// import global styles

/** @type { import('@storybook/html').Preview } */
const preview = {
  tags: ["autodocs"],
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
