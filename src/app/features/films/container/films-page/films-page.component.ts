import { Component, OnInit } from '@angular/core';
import { FilmService } from "../../services/film.service";
import { Observable } from "rxjs";
import { Film } from "../../models/film.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-films-page',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.scss']
})
export class FilmsPageComponent implements OnInit {

  films$: Observable<Film[]> = this.filmService.getListFilms();

  constructor(private filmService: FilmService, private router: Router) { }

  ngOnInit(): void {
  }

  openFilm(id: string){
    this.router.navigate(['/films', id]);
  }

}
