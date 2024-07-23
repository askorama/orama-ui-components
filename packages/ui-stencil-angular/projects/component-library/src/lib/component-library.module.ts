import { NgModule, APP_INITIALIZER } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';
import { defineCustomElements } from '@orama/wc-components/loader';

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    },
  ],
})
export class ComponentLibraryModule {}
