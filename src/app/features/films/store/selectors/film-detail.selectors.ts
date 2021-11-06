import { createSelector } from "@ngrx/store";
import { getFilmsFeatureState } from "../reducers";

export const getDetailsState = createSelector(getFilmsFeatureState, (state) => state.details);
export const getFilmDetail = createSelector(getDetailsState, (state) => state.film);
export const getFilmLoading = createSelector(getDetailsState, (state) => state.loading);
export const getFilmUuid = createSelector(getDetailsState, (state) => state.uuid);
