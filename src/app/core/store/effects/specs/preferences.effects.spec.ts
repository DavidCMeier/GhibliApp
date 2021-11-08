import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import * as fromEffects from '../../index';
import * as fromReducer from '../../reducers/preferences.reducer';
import * as fromActions from '../../actions';
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

describe('The preferences effects', () => {
  let actions$ = new Observable<Action>();
  let effects: fromEffects.PreferencesEffects;
  let translateService: TranslateService;

  beforeEach(() => {
    jest.clearAllMocks();
    const { initialState } = fromReducer;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        fromEffects.PreferencesEffects,
        TranslateService,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ]
    });
    translateService = TestBed.inject(TranslateService);
    effects = TestBed.inject(fromEffects.PreferencesEffects);
  });

  describe('when set Language', () => {
    it('should return the same action and call TranslateService use method one time', (done) => {
      const translateServiceSpy = jest.spyOn(translateService, 'use')

      actions$ = of(fromActions.setLanguage({ language: 'test' }));

      effects.setLanguage$.subscribe((actions) => {
        expect(translateServiceSpy).toHaveBeenCalledTimes(1);
        expect(actions.type).toEqual(fromActions.setLanguage.type);
        done();
      });
    });
  });

});
