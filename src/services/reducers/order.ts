// Импорт типов действий для заказов
import { FETCH_ORDER, FETCH_ORDER_FAILED, FETCH_ORDER_SUCCESS } from '../types/order';

import { IOrder } from '../../utils/types/order';

import { TOrderActions } from '../actions/order';

type TOrderState = {
  information: IOrder | null;
  isRequesting: boolean;
  hasRequestFailed: boolean;
};

// Начальное состояние редюсера заказов
const initialState: TOrderState = {
  information: null, // Информация о заказе
  isRequesting: false, // Идет ли запрос на сервер
  hasRequestFailed: false, // Был ли запрос завершен неудачей
};

// Редюсер для управления состоянием заказов
export const orderReducer = (state = initialState, actions: TOrderActions) => {
  switch (actions.type) {
    case FETCH_ORDER: {
      // Обработка начала запроса на получение заказа
      return {
        ...state,
        information: {}, // Обнуление информации о заказе
        isRequesting: true, // Установка флага запроса
        hasRequestFailed: false, // Сброс флага неудачи запроса
      };
    }
    case FETCH_ORDER_FAILED: {
      // Обработка неудачного запроса на получение заказа
      return {
        ...state,
        isRequesting: false, // Сброс флага запроса
        hasRequestFailed: true, // Установка флага неудачи запроса
      };
    }
    case FETCH_ORDER_SUCCESS: {
      // Обработка успешного запроса на получение заказа
      return {
        ...state,
        information: { ...actions.payload }, // Обновление информации о заказе из полученных данных
        isRequesting: false, // Сброс флага запроса
      };
    }
    default: {
      // Возвращение текущего состояния в случае неизвестного действия
      return state;
    }
  }
};
