// Импорт типов действий для управления вкладками
import { SET_ACTIVE_TAB } from '../types/tabs';

// Импорт констант, связанных с компонентами вкладок
import { COMPONENT_TABS } from '../../utils/constants';

// Получение ключей вкладок из объекта COMPONENT_TABS
const componentTabsKeys = Object.entries(COMPONENT_TABS);

import { TTabsActions } from '../actions/tabs';

type TTabsState = {
  tabs: string[][];
  activeTab: string;
};

// Начальное состояние хранилища вкладок
const initialState: TTabsState = {
  tabs: componentTabsKeys, // Массив ключей вкладок
  activeTab: componentTabsKeys[0][0], // Активная вкладка по умолчанию
};

// Редуктор для управления состоянием вкладок
export const tabsReducer = (state = initialState, actions: TTabsActions) => {
  switch (actions.type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: actions.payload,
      };
    default:
      // Возвращение текущего состояния в случае отсутствия совпадений с типами действий
      return state;
  }
};
