import { tabsReducer } from '../reducers/tabs';
import * as types from '../types/tabs';

describe('tabsReducer', () => {
  it('обрабатывает SET_ACTIVE_TAB', () => {
    const action = { type: types.SET_ACTIVE_TAB, payload: 'newTab' };
    const result = tabsReducer(undefined, action);
    expect(result.activeTab).toBe('newTab');
  });
});