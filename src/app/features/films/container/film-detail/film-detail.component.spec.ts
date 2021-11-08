import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDetailComponent } from './film-detail.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Film } from "../../models/film.model";
import { FilmsState, getFilmDetail, getFilmsFeatureState, loadFilm, unloadFilm } from "../../store";
import { PosterComponent } from "../../components/poster/poster.component";
import { CardDetailComponent } from "../../components/card-detail/card-detail.component";
import { TranslateModule } from "@ngx-translate/core";
import { getQueryParams, getRouteParams } from "../../../../core/store";
import { Actions } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { provideMockActions } from "@ngrx/effects/testing";
import { MatCardModule } from "@angular/material/card";
import { film } from "../../models/film.fixture";

describe('FilmDetailComponent', () => {
  let component: FilmDetailComponent;
  let fixture: ComponentFixture<FilmDetailComponent>;

  let store: MockStore<FilmsState>;
  let actions$ = new Observable<Action>();

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      declarations: [ FilmDetailComponent, PosterComponent, CardDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        MatCardModule,
        ],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$),
        ]
    })
    store = TestBed.inject(MockStore)
    jest.spyOn(store, 'dispatch')

    fixture = TestBed.createComponent(FilmDetailComponent);
    component = fixture.componentInstance;
    actions$ = TestBed.inject(Actions);

  });
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot()
  });
  it('should show details from one movie', () => {
    getFilmDetail.setResult(film);
    store.refreshState()
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot()
  });
  it('should be call LoadFilm with id router and unloadFilm when component destroy', () => {
    getRouteParams.setResult({id: 'test'})
    getQueryParams.setResult({})
    getFilmsFeatureState.setResult({
      details: {
        loading: false,
        film,
        uuid: null
      }, films: {
        films: [],
        loading: false,
      }
    })
    store.refreshState()

    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(loadFilm({uuid: 'test'}))

    fixture.destroy()
    expect(store.dispatch).toHaveBeenCalledWith(unloadFilm())
  })
});
