import { TestBed } from "@angular/core/testing";
import {Location} from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import * as fromEffects from '../../index';
import * as fromReducer from '../../reducers/router.reducer';
import * as fromActions from '../../actions';
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";
import { NavigationExtras, Router } from "@angular/router";
import { ShellComponent } from "../../../containers/shell/shell.component";

describe('The preferences effects', () => {
  let actions$ = new Observable<Action>();
  let effects: fromEffects.RouterEffects;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: 'test', component: ShellComponent }]), TranslateModule.forRoot()],
      providers: [
        fromEffects.RouterEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ]
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    effects = TestBed.inject(fromEffects.RouterEffects);
  });

  describe('when go', () => {
    it('should return the same action and call router navigate method with the action data', (done) => {
      const routerSpy = jest.spyOn(router, 'navigate')
      const extras: NavigationExtras = {
        queryParams: {
          lang: 'en'
        }
      };
      actions$ = of(fromActions.go({ commands: ['test'], extras }));

      effects.go$.subscribe((actions) => {
        expect(routerSpy).toHaveBeenCalledTimes(1);
        expect(routerSpy).toHaveBeenCalledWith(actions.commands, actions.extras);
        expect(actions.type).toEqual(fromActions.go.type);
        done();
      });
    });
  });

  describe('when back', () => {
    it('should return the same action and call location back', (done) => {
      const locationSpy = jest.spyOn(location, 'back')

      actions$ = of(fromActions.back());

      effects.back$.subscribe((actions) => {
        expect(locationSpy).toHaveBeenCalledTimes(1);
        expect(actions.type).toEqual(fromActions.back.type);
        done();
      });
    });
  });

  describe('when forward', () => {
    it('should return the same action and call location forward', (done) => {
      const locationSpy = jest.spyOn(location, 'forward')

      actions$ = of(fromActions.forward());

      effects.forward$.subscribe((actions) => {
        expect(locationSpy).toHaveBeenCalledTimes(1);
        expect(actions.type).toEqual(fromActions.forward.type);
        done();
      });
    });
  });

});
