import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as RouterActions from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}

  go$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.go),
        tap(({ commands, extras }) => {
          this.router.navigate(commands, { ...extras });
        })
      ),
    { dispatch: false }
  );

  back$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  forward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.forward),
      tap(() => this.location.forward())
    ),
    { dispatch: false }
  );
}
