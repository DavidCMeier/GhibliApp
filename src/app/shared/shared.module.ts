import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsListComponent } from "./components/films-list/films-list.component";
import { CardFilmComponent } from "./components/card-film/card-film.component";
import { MatCardModule } from "@angular/material/card";
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";



@NgModule({
  declarations: [FilmsListComponent, CardFilmComponent, LoadingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FilmsListComponent,
    CardFilmComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
