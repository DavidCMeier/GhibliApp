import { CoreState } from '../reducers';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import * as preferencesActions from '../actions';

@Injectable()
export class PreferencesEffects {
  constructor(
    private actions$: Actions,
    private translate: TranslateService,
    private store: Store<CoreState>
  ) {}

  setLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(preferencesActions.setLanguage),
      tap((action) => {
        this.translate.use(action.language);
      })
    ),
    { dispatch: false }
  );
}
