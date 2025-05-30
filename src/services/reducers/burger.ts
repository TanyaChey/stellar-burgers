// Импорт констант для действий с бургером
import { ADD_BUN, ADD_INGREDIENT, DELETE_ALL_INGREDIENTS, DELETE_INGREDIENT, SEND_ORDER, SEND_ORDER_FAILED, SEND_ORDER_SUCCESS, SORT_INGREDIENTS, SET_ORDER_STATE } from '../types/burger';

import { IUuid } from '../../utils/types/types';
import { IOrder } from '../../utils/types/order';
import { IIngredient } from '../../utils/types/ingredients';
import { COMPONENT_TABS } from '../../utils/constants';

import { TBurgerActions } from '../actions/burger';

type TBurgerState = {
  bun: (IIngredient & IUuid) | null;
  ingredients: (IIngredient & IUuid)[];
  isRequesting: boolean;
  hasRequestFailed: boolean;
  order: IOrder | null;
  isOrder: boolean;
};

// Начальное состояние хранилища для бургера
const initialState: TBurgerState = {
  bun: null, // Информация о булке
  ingredients: [], // Массив ингредиентов
  isRequesting: false, // Флаг отправки заказа
  hasRequestFailed: false, // Флаг неудачной отправки заказа
  order: null, // Информация о заказе
  isOrder: false, // Флаг отправки заказа
};

// Редуктор для управления состоянием хранилища бургера
export const burgerReducer = (state = initialState, action: TBurgerActions) => {
  // Обработка различных действий с бургером
  switch (action.type) {
    // Добавление ингредиента
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    // Добавление булки
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    // Удаление ингредиента
    case DELETE_INGREDIENT: {
      const updatedIngredients = state.ingredients.filter((ingredient) => ingredient.uuid !== action.payload);

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    }
    // Удаление всех ингредиентов
    case DELETE_ALL_INGREDIENTS: {
      return {
        ...state,
        bun: {},
        ingredients: [],
      };
    }
    // Сортировка ингредиентов
    case SORT_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...action.payload],
      };
    }
    // Отправка заказа
    case SEND_ORDER: {
      return {
        ...state,
        isRequesting: true,
        hasRequestFailed: false,
        order: {},
      };
    }
    // Ошибка при отправке заказа
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        isRequesting: false,
        hasRequestFailed: true,
      };
    }
    // Успешная отправка заказа
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        isRequesting: false,
        order: action.payload,
      };
    }
    case SET_ORDER_STATE: {
      return {
        ...state,
        isOrder: action.payload,
      };
    }
    // Если действие не определено, возвращаем текущее состояние
    default: {
      return state;
    }
  }
};
