import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  title = 'ghibliApp';

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
  }
}
