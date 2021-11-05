import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsPageComponent } from './container/films-page/films-page.component';
import { RouterModule, Routes } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { FilmDetailComponent } from './container/film-detail/film-detail.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { PosterComponent } from './components/poster/poster.component';
import { SharedModule } from "../../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";


const routes: Routes = [
  {
    path: '',
    component: FilmsPageComponent,
  },
  {
    path: ':id',
    component: FilmDetailComponent,
  }
]


@NgModule({
  declarations: [
    FilmsPageComponent,
    FilmDetailComponent,
    CardDetailComponent,
    PosterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    SharedModule,
    TranslateModule
  ]
})
export class FilmsModule { }
