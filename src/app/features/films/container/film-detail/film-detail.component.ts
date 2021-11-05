import { Component, OnInit } from '@angular/core';
import { FilmService } from "../../services/film.service";
import { Observable } from "rxjs";
import { Film } from "../../models/film.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  film$!: Observable<Film>;
  constructor(private route: ActivatedRoute, private filmService: FilmService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id) {
        this.getFilmById(params.id);
      }
    });
  }

  getFilmById(id: string) {
    this.film$ = this.filmService.getFilmById(id);
  }

}
