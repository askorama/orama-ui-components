import type { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import { postcss } from '@stencil-community/postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcssPresetEnv from 'postcss-preset-env'
import rucksack from 'rucksack-css'
import cssfunctions from 'postcss-functions'
import { reactOutputTarget } from '@stencil/react-output-target'
import { angularOutputTarget } from '@stencil/angular-output-target'
import { vueOutputTarget } from '@stencil/vue-output-target'

const namespace = 'orama-ui'
const componentCorePackage = namespace

export const config: Config = {
  namespace,
  globalStyle: 'src/styles/globals.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      componentCorePackage,
      proxiesFile: '../ui-stencil-react/src/components/stencil-generated/index.ts',
    }),
    angularOutputTarget({
      componentCorePackage,
      directivesProxyFile: '../ui-stencil-angular/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../ui-stencil-angular/projects/component-library/src/lib/stencil-generated/index.ts',
    }),
    vueOutputTarget({
      componentCorePackage,
      proxiesFile: '../ui-stencil-vue/lib/components.ts',
    }),
  ],
  testing: {
    browserHeadless: 'new',
  },
  plugins: [
    sass({
      injectGlobalPaths: ['src/styles/abstracts.scss'],
    }),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano(),
        rucksack(),
        cssfunctions({
          functions: {
            pxToRem: (px: string) => `calc(${px}rem / var(--base-font-size, 16))`,
          },
        }),
        postcssPresetEnv({
          stage: 3,
          features: {
            'nesting-rules': true,
            'custom-media-queries': true,
            'media-query-ranges': true,
            'custom-properties': true,
            'nested-calc': true,
            'prefers-color-scheme-query': true,
          },
        }),
      ],
    }),
  ],
}
