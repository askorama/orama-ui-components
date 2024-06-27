import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { ComponentLibraryModule } from 'ui-stencil-angular/dist/component-library'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentLibraryModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule {}
