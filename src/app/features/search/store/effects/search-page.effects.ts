import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from '../actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { FilmService } from "../../../films/services/film.service";

@Injectable()
export class SearchPageEffects {
  constructor(private actions$: Actions, private filmService: FilmService) {}

  loadFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadSearchedFilm),
      map(action => action.query),
      switchMap((query) =>
        this.filmService.searchFilms(query).pipe(
          map((films) =>
            fromActions.loadSearchedFilmSuccess({films})
          ),
          catchError(() => of(fromActions.loadSearchedFilmError()))
        )
      )
    )
  );
}
