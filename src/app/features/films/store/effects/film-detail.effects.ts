import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FilmService } from "../../services/film.service";
import * as fromActions from '../actions';
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class FilmDetailEffects {
  constructor(private actions$: Actions, private filmService: FilmService) {}

  loadFilmDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadFilm),
      map(action => action.uuid),
      switchMap((uuid) =>
        this.filmService.getFilmById(uuid).pipe(
          map((film) =>
            fromActions.loadFilmSuccess({film})
          ),
          catchError(() => of(fromActions.loadFilmError()))
        )
      )
    )
  );
}
