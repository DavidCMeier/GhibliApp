import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FilmService } from "../../services/film.service";
import * as fromActions from '../actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Film } from "../../models/film.model";

@Injectable()
export class FilmsPageEffects {
  constructor(private actions$: Actions, private filmService: FilmService) {}

  loadFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadFilms),
      switchMap(() =>
        this.filmService.getListFilms().pipe(
          map((films) =>
            fromActions.loadFilmsSuccess({films}),
          ),
          catchError(() => of(fromActions.loadFilmsError()))
        )
      )
    )
  );
}
