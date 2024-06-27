import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

const namespace = 'ui-stencil';
const componentCorePackage = namespace;

export const config: Config = {
  namespace,
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
};
