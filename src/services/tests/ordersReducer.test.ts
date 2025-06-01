import { ordersReducer } from '../reducers/orders';
import {
  WS_START,
  WS_SUCCESS,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_CLOSED,
} from '../types/orders';

const initialState = {
  orders: [],
  isLoading: false,
  isConnection: false,
  hasConnectionFailed: false,
  total: 0,
  totalToday: 0,
};

describe('ordersReducer', () => {
  it('should return initial state', () => {
    // Приводим тип к any, чтобы избежать ошибки TS
    expect(ordersReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
  });

  it('should handle WS_START', () => {
    expect(ordersReducer(initialState, { type: WS_START })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle WS_SUCCESS', () => {
    const state = { ...initialState, isLoading: true };
    expect(ordersReducer(state, { type: WS_SUCCESS })).toEqual({
      ...state,
      isConnection: true,
    });
  });

  it('should handle WS_ERROR', () => {
    const state = { ...initialState, isLoading: true };
    expect(ordersReducer(state, { type: WS_ERROR })).toEqual({
      ...state,
      hasConnectionFailed: true,
    });
  });

  it('should handle WS_GET_ORDERS', () => {
    // Пример корректного массива заказов, соответствующих интерфейсу IOrder
    const payload = {
      orders: [
        {
          _id: 'order1',
          owner: 'owner1',
          status: 'done',
          name: 'Order 1',
          createdAt: '2025-06-01T10:00:00Z',
          updatedAt: '2025-06-01T11:00:00Z',
          number: 101,
          __v: 0,
          ingredients: ['ingredient1', 'ingredient2'],
        },
        {
          _id: 'order2',
          owner: 'owner2',
          status: 'pending',
          name: 'Order 2',
          createdAt: '2025-06-01T12:00:00Z',
          updatedAt: '2025-06-01T12:30:00Z',
          number: 102,
          __v: 0,
          ingredients: ['ingredient3'],
        },
      ],
      total: 10,
      totalToday: 5,
    };
    const state = { ...initialState, isLoading: true };
    expect(ordersReducer(state, { type: WS_GET_ORDERS, payload })).toEqual({
      ...state,
      isLoading: false,
      hasConnectionFailed: false,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday,
    });
  });

  it('should handle WS_CLOSED', () => {
    const state = { ...initialState, isConnection: true };
    expect(ordersReducer(state, { type: WS_CLOSED })).toEqual({
      ...state,
      isConnection: false,
    });
  });
});