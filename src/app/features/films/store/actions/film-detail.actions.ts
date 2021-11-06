import { createAction, props } from "@ngrx/store";
import { Film } from "../../models/film.model";


export const loadFilm = createAction('[Films Detail] Load Film', props<{uuid: string}>())
export const loadFilmSuccess = createAction('[Films Detail] Load Film Success', props<{film: Film}>())
export const loadFilmError = createAction('[Films Detail] Load Film Success')
export const unloadFilm = createAction('[Films Detail] Unload Film')
