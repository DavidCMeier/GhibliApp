import { Film } from "../../models/film.model";
import { createReducer, on } from "@ngrx/store";
import * as filmsDetailActions from '../actions'

export interface State {
  film: Film | null,
  loading: boolean,
  uuid: string | null
}

export const initialState: State = {
  film: null,
  loading: false,
  uuid: null
};

export const reducer = createReducer(
  initialState,
  on(filmsDetailActions.loadFilm, (state, action) => ({
    ...state,
    loading: true,
    uuid: action.uuid
  })),
  on(filmsDetailActions.loadFilmSuccess, (state, action) => ({
    ...state,
    loading: false,
    film: action.film
  })),
  on(filmsDetailActions.loadFilmError, (state) => ({
    ...state,
    loading: false,
  })),
  on(filmsDetailActions.unloadFilm, (state) => ({
    ...initialState
  }))
)
