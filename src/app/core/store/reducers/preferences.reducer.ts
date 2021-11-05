import { createReducer, on } from "@ngrx/store";
import * as preferencesActions from '../actions';


export interface State {
  language: string;
}

export const initialState: State = {
  language: 'en'
};

export const reducer = createReducer<State>(
  initialState,
  on(preferencesActions.setLanguage, (state, action): State => ({...state, language: action.language}))
)
