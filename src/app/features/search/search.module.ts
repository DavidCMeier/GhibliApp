import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { RouterModule, Routes } from "@angular/router";
import { BarSearchComponent } from './components/bar-search/bar-search.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
  }
]

@NgModule({
  declarations: [
    SearchPageComponent,
    BarSearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ]
})
export class SearchModule { }
