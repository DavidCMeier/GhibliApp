import { createAction, props } from "@ngrx/store";
import { Film } from "../../../films/models/film.model";

export const loadSearchedFilm = createAction('[Search Page] Load Searched Films', props<{query: string}>())
export const loadSearchedFilmSuccess = createAction('[Search Page] Load Searched Films Success', props<{films: Film[]}>())
export const loadSearchedFilmError = createAction('[Search Page] Load Searched Films Error')
