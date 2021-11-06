import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromSearch from './search-page.reducer';

export interface SearchState {
  search: fromSearch.State,
}

export const reducers: ActionReducerMap<SearchState> = {
  search: fromSearch.reducer,
}

export const getSearchFeatureState = createFeatureSelector<SearchState>('search')

