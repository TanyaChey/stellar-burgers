import { SET_ACTIVE_TAB } from '../types/tabs';

export interface ISetActiveTabAction {
  readonly type: typeof SET_ACTIVE_TAB;
  readonly payload: string;
}

export type TTabsActions = ISetActiveTabAction;


// Устанавливает активную вкладку
export const setActiveTab = (tab: string): ISetActiveTabAction => ({ type: SET_ACTIVE_TAB, payload: tab });
