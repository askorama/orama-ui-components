import { defineCustomElements } from "./../../../packages/ui-stencil/loader";
// TODO: import orama-ui from the package
import "./../../../packages/ui-stencil/dist/orama-ui/orama-ui.css";

defineCustomElements();

/** @type { import('@storybook/html').Preview } */
const preview = {
  tags: ["autodocs"],
  // wrap story in a div with id="orama-ui" 
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
