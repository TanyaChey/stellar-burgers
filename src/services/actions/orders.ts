// Импорт типов действий для работы с WebSocket из файла '../types/orders'
import { WS_CLOSED, WS_ERROR, WS_GET_ORDERS, WS_START, WS_SUCCESS } from '../types/orders';
import { IOrder } from '../../utils/types/order';

export interface IWsOrdersConnectionStartAction {
  readonly type: typeof WS_START;
}

export interface IWsOrdersConnectionClosedAction {
  readonly type: typeof WS_CLOSED;
}

export interface IWsOrdersConnectionErrorAction {
  readonly type: typeof WS_ERROR;
}

export interface IWsOrdersConnectionSuccessAction {
  readonly type: typeof WS_SUCCESS;
}

export interface IGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: { orders: IOrder[]; total: number; totalToday: number };
}

export type TOrdersActions =
  | IWsOrdersConnectionStartAction
  | IWsOrdersConnectionClosedAction
  | IWsOrdersConnectionErrorAction
  | IWsOrdersConnectionSuccessAction
  | IGetOrdersAction;

// Действие для запуска соединения с WebSocket
export const wsOrdersConnectionStart = (): IWsOrdersConnectionStartAction => ({ type: WS_START });

// Действие для закрытия соединения с WebSocket
export const wsOrdersConnectionClosed = (): IWsOrdersConnectionClosedAction => ({ type: WS_CLOSED });

// Действие для запроса данных о заказах через WebSocket
export const getOrders = (data: { orders: IOrder[]; total: number; totalToday: number }): IGetOrdersAction => ({ type: WS_GET_ORDERS, payload: data });
