import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsPageComponent } from './container/films-page/films-page.component';
import { RouterModule, Routes } from "@angular/router";
import { FilmsListComponent } from './components/films-list/films-list.component';
import { CardFilmComponent } from './components/card-film/card-film.component';
import { MatCardModule } from "@angular/material/card";
import { FilmDetailComponent } from './container/film-detail/film-detail.component';


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
    FilmsListComponent,
    CardFilmComponent,
    FilmDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule
  ]
})
export class FilmsModule { }
