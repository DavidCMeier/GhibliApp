import * as fromReducer from '../preferences.reducer';
import * as fromActions from '../../actions/preferences.actions';

describe('The preferences reducer', () => {
  describe('with an unknown action', () => {
    it('should return the previous state', () => {
      const { initialState } = fromReducer;

      const action = {
        type: 'Unknown'
      };

      const state = fromReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('with an setLanguage action', () => {
    it('should return the language state', () => {
      const { initialState } = fromReducer;

      const language = 'test';

      const action = fromActions.setLanguage({ language });
      const state = fromReducer.reducer(initialState, action);

      expect(state.language).toBe(language);
    });
  });
})
