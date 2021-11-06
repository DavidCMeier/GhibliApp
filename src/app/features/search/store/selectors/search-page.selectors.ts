import { createSelector } from "@ngrx/store";
import { getSearchFeatureState } from "../reducers";

export const getFilmsState = createSelector(getSearchFeatureState, (state) => state.search)
export const getFilmsSearched = createSelector(getFilmsState, (state) => state.films)
export const getFilmsQuery = createSelector(getFilmsState, (state) => state.query)
export const getSearchLoading = createSelector(getFilmsState, (state) => state.loading)
