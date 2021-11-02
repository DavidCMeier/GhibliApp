import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './components/root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CoreModule } from "../core/core.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    RootRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
