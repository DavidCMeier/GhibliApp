import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromFilms from './films-page.reducer';
import * as fromDetails from './film-detail.reducer';

export interface FilmsState {
  films: fromFilms.State,
  details: fromDetails.State,
}

export const reducers: ActionReducerMap<FilmsState> = {
  films: fromFilms.reducer,
  details: fromDetails.reducer,
}

export const getFilmsFeatureState = createFeatureSelector<FilmsState>('films')

