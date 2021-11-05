import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getPreferences = createSelector(fromFeature.getCoreState, (state) => state.preferences);
export const getCurrentLanguage = createSelector(getPreferences, (state) => state.language);
