import { Film } from "../../models/film.model";
import { createReducer, on } from "@ngrx/store";
import * as filmsPageActions from '../actions'
export interface State {
  films: Film[],
  loading: boolean
}

export const initialState: State = {
  films: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(filmsPageActions.loadFilms, (state) => ({
    ...state,
    loading: true,
  })),
  on(filmsPageActions.loadFilmsSuccess, (state, action) => ({
    ...state,
    loading: false,
    films: action.films
  })),
  on(filmsPageActions.loadFilmsError, (state) => ({
    ...state,
    loading: false,
  })),
)
