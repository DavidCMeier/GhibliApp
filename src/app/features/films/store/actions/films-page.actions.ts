import { createAction, props } from "@ngrx/store";
import { Film } from "../../models/film.model";

export const loadFilms = createAction('[Films Page] Load Films')
export const loadFilmsSuccess = createAction('[Films Page] Load Films Success', props<{films: Film[]}>())
export const loadFilmsError = createAction('[Films Page] Load Films')
