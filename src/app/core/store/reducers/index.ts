import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromPreferences from './preferences.reducer';

export interface CoreState {
  preferences: fromPreferences.State,
  // router: fromRouter.State
}

export const reducers: ActionReducerMap<CoreState> = {
  preferences: fromPreferences.reducer,
  // router: fromRouter.reducer
}

export const getCoreState = createFeatureSelector<CoreState>('core');
