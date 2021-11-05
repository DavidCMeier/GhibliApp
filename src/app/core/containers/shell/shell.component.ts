import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { Language } from "../../models/language.model";
import { take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromStore from '../../store';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit {

  languages!: Language[];
  currentLang$ = this.store$.select(fromStore.getCurrentLanguage)
  constructor(private translate: TranslateService, private languageService: LanguageService, private store$: Store<fromStore.CoreState>,) { }


  ngOnInit(): void {
    this.languageService.getLanguages().pipe(take(1)).subscribe(languages => {
      this.languages = languages
    });
  }

  changeLanguage(language: string) {
    this.store$.dispatch(fromStore.setLanguage({ language }));
  }

}
