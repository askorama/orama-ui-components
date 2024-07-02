import { defineCustomElements } from "./../../../packages/ui-stencil/loader";
import "./../../../packages/ui-stencil/dist/orama-ui/orama-ui.css";

defineCustomElements();

/** @type { import('@storybook/html').Preview } */
const preview = {
  tags: ["autodocs"],
  decorators: [
    (story) => {
      const decorator = document.createElement('div');
      decorator.id = 'orama-ui';
      decorator.appendChild(story());
      return decorator;
    }
  ],
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
