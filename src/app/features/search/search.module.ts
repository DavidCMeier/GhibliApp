import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
  }
]

@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchModule { }
