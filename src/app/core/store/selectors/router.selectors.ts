import { createSelector } from "@ngrx/store";
import * as fromReducers from '../reducers';

export const getRouterState = createSelector(fromReducers.getCoreState, (state) => state.router);
const getState = createSelector(getRouterState, (state) => state.state);
export const getRouteParams = createSelector(getState, (state) => state.params);
export const getQueryParams = createSelector(getState, (state) => state.queryParams);
export const getCurrentUrl = createSelector(getState, (state) => state.url);
