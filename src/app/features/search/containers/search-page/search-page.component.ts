import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService } from "../../../films/services/film.service";
import { take } from "rxjs/operators";
import { Film } from "../../../films/models/film.model";
import { Observable } from "rxjs";
import * as fromStore from "../../../../core/store";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
  films$!: Observable<Film[]>;

  constructor(private filmService: FilmService, private store$: Store) { }

  ngOnInit(): void {
  }

  searchFilm(searchText: string) {
    this.films$= this.filmService.searchFilms(searchText).pipe(take(1))
  }

  openFilm(id: string){
    this.store$.dispatch(fromStore.go({commands: ['/films', id]}));
  }
}
