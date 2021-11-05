import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { Language } from "../../models/language.model";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  languages!: Language[];
  currentLang!: string;
  constructor(private translate: TranslateService, private languageService: LanguageService) { }


  ngOnInit(): void {
    this.languageService.getLanguages().pipe(take(1)).subscribe(languages => {
      this.languages = languages
      this.currentLang = this.translate.getDefaultLang();
    });
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

}
