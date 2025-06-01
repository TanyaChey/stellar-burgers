import { tabsReducer } from '../reducers/tabs';
import { SET_ACTIVE_TAB } from '../types/tabs';
import { COMPONENT_TABS } from '../../utils/constants';

const componentTabsKeys = Object.entries(COMPONENT_TABS);

const initialState = {
  tabs: componentTabsKeys,
  activeTab: componentTabsKeys[0][0],
};

describe('tabsReducer', () => {
  it('should return initial state', () => {
    // Приводим экшен к any, чтобы избежать ошибки типов
    expect(tabsReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
  });

  it('should handle SET_ACTIVE_TAB', () => {
    expect(tabsReducer(initialState, { type: SET_ACTIVE_TAB, payload: 'newTab' })).toEqual({
      ...initialState,
      activeTab: 'newTab',
    });
  });
});