import { orderReducer } from '../reducers/order';
import {
  FETCH_ORDER,
  FETCH_ORDER_FAILED,
  FETCH_ORDER_SUCCESS
} from '../types/order';

const initialState = {
  information: null,
  isRequesting: false,
  hasRequestFailed: false,
};

describe('orderReducer', () => {
  it('should return initial state', () => {
    // Добавляем as any, чтобы избежать ошибки TS с неизвестным типом
    expect(orderReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
  });

  it('should handle FETCH_ORDER', () => {
    expect(orderReducer(initialState, { type: FETCH_ORDER })).toEqual({
      information: {},
      isRequesting: true,
      hasRequestFailed: false,
    });
  });

  it('should handle FETCH_ORDER_FAILED', () => {
    const state = { ...initialState, isRequesting: true };
    expect(orderReducer(state, { type: FETCH_ORDER_FAILED })).toEqual({
      ...state,
      isRequesting: false,
      hasRequestFailed: true,
    });
  });

  it('should handle FETCH_ORDER_SUCCESS', () => {
    // Пример полноценного объекта, соответствующего интерфейсу IOrder
    const orderInfo = {
      _id: 'order123',
      owner: 'user123',
      status: 'done',
      name: 'Order 1',
      createdAt: '2025-06-01T12:00:00Z',
      updatedAt: '2025-06-01T13:00:00Z',
      number: 101,
      __v: 0,
      ingredients: ['ingredient1', 'ingredient2']
    };
    const state = { ...initialState, isRequesting: true };
    expect(orderReducer(state, { type: FETCH_ORDER_SUCCESS, payload: orderInfo })).toEqual({
      information: orderInfo,
      isRequesting: false,
      hasRequestFailed: false,
    });
  });
});