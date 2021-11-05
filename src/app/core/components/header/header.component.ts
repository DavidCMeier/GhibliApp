import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from "../../models/language.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() changeLanguage = new EventEmitter<string>();
  @Input() languages: Language[] = []
  @Input() currentLang!: string;
  constructor() { }

  ngOnInit(): void {
  }

  changeLanguageValue(lang: string | undefined){
    this.changeLanguage.emit(lang || 'en');
  }

}
