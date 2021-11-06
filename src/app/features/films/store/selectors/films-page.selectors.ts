import { createSelector } from "@ngrx/store";
import { getFilmsFeatureState } from "../reducers";

export const getFilmsState = createSelector(getFilmsFeatureState, (state) => state.films)
export const getFilmsList = createSelector(getFilmsState, (state) => state.films)
export const getFilmsLoading = createSelector(getFilmsState, (state) => state.loading)
