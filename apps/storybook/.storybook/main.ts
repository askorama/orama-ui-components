import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: '@storybook/web-components-vite',
  staticDirs: [{ from: '../../../packages/ui-stencil/dist/orama-ui', to: '/assets' }],
  docs: {},
  previewHead: (head) => `
   ${head}
    <script type="module" src="assets/orama-ui.esm.js"></script>
    <link rel="stylesheet" href="assets/orama-ui.css" />

  `,
}
export default config
