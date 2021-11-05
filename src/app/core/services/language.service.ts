import { Injectable } from '@angular/core';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  getLanguages() {
    return of([{
      code: 'en',
      name: 'English'
    }, {
      code: 'es',
      name: 'Español'
    }]);
  }
}
