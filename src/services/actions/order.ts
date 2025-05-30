import { FETCH_ORDER, FETCH_ORDER_FAILED, FETCH_ORDER_SUCCESS } from '../types/order';
import { IOrder } from '../../utils/types/order';

export interface IFetchOrderAction {
  readonly type: typeof FETCH_ORDER;
}

export interface IFetchOrderSuccessAction {
  readonly type: typeof FETCH_ORDER_SUCCESS;
  readonly payload: IOrder;
}

export interface IFetchOrderFailedAction {
  readonly type: typeof FETCH_ORDER_FAILED;
}

export type TOrderActions = IFetchOrderAction | IFetchOrderSuccessAction | IFetchOrderFailedAction;

// Действие для запроса заказа
export const fetchOrder = (): IFetchOrderAction => ({ type: FETCH_ORDER });

// Действие при успешном получении заказа
export const fetchOrderSuccess = (orderData: IOrder): IFetchOrderSuccessAction => ({
  type: FETCH_ORDER_SUCCESS,
  payload: orderData,
});

// Действие при неудачном получении заказа
export const fetchOrderFailed = (): IFetchOrderFailedAction => ({ type: FETCH_ORDER_FAILED });
