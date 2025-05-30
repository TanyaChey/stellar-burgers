import { WS_CLOSED, WS_ERROR, WS_GET_ORDERS, WS_START, WS_SUCCESS } from '../types/orders';

import { IOrder } from '../../utils/types/order';

import { TOrdersActions } from '../actions/orders';

type TOrdersState = {
  orders: IOrder[];
  isLoading: boolean;
  isConnection: boolean;
  hasConnectionFailed: boolean;
  total: number;
  totalToday: number;
};

// Начальное состояние редуктора для заказов
const initialState: TOrdersState = {
  orders: [], // Массив заказов
  isLoading: false, // Флаг загрузки данных
  isConnection: false, // Флаг успешного подключения к WebSocket
  hasConnectionFailed: false, // Флаг неудачного подключения к WebSocket
  total: 0, // Общее количество заказов
  totalToday: 0, // Общее количество заказов за текущий день
};

// Редуктор для управления состоянием заказов
export const ordersReducer = (state = initialState, actions: TOrdersActions) => {
  switch (actions.type) {
    case WS_START:
      // Начало подключения к WebSocket
      return {
        ...initialState,
        isLoading: true,
      };
    case WS_SUCCESS:
      // Успешное подключение к WebSocket
      return {
        ...state,
        isConnection: true,
      };
    case WS_ERROR:
      // Ошибка при подключении к WebSocket
      return {
        ...state,
        hasConnectionFailed: true,
      };
    case WS_GET_ORDERS: {
      // Получение данных о заказах через WebSocket
      const { orders, total, totalToday } = actions.payload;
      return {
        ...state,
        isLoading: false,
        hasConnectionFailed: false,
        orders: [...orders],
        total,
        totalToday,
      };
    }
    case WS_CLOSED:
      // Закрытие WebSocket
      return {
        ...state,
        isConnection: false,
      };
    default:
      // Возврат текущего состояния в случае неизвестного действия
      return state;
  }
};
