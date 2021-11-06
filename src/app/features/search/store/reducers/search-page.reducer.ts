import { Film } from "../../../films/models/film.model";
import { createReducer, on } from "@ngrx/store";
import * as filmsPageActions from '../actions'

export interface State {
  films: Film[],
  query: string,
  loading: boolean
}

export const initialState: State = {
  films: [],
  query: '',
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(filmsPageActions.loadSearchedFilm, (state, action) => ({
    ...state,
    query: action.query,
    loading: true,
  })),
  on(filmsPageActions.loadSearchedFilmSuccess, (state, action) => ({
    ...state,
    loading: false,
    films: action.films
  })),
  on(filmsPageActions.loadSearchedFilmError, (state) => ({
    ...state,
    loading: false,
  })),
)
