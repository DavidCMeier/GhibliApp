import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsListComponent } from "./components/films-list/films-list.component";
import { CardFilmComponent } from "./components/card-film/card-film.component";
import { MatCardModule } from "@angular/material/card";



@NgModule({
  declarations: [FilmsListComponent, CardFilmComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports:[
    FilmsListComponent,
    CardFilmComponent
  ]
})
export class SharedModule { }
