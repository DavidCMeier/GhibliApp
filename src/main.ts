import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RootModule } from './app/root/root.module';
import { environment } from './environments/environment';
import { Settings } from "./app/core/models/settings.model";
import { API_BASE_URL } from "./app/root/tokens/tokens";

const configListener = () => {
  try {
    const config: Settings = JSON.parse(request.responseText)

    platformBrowserDynamic([
      { provide: API_BASE_URL, useValue: config.apiBaseUrl },
    ]).bootstrapModule(RootModule)
      .catch(err => console.error(err));
  } catch (error) {
    console.log(error)
  }
};

if (environment.production) {
  enableProdMode();
}


const configFailed = (evt: any) => {
  console.error('Error: retrieving config.json');
};

const request = new XMLHttpRequest();
request.addEventListener('load', configListener);
request.addEventListener('error', configFailed);
request.open('GET', 'settings.json');
request.send();
