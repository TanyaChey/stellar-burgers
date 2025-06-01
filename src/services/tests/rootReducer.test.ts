import { ordersReducer } from '../reducers/orders';
import {
  WS_SUCCESS,
  WS_ERROR,
  WS_CLOSED,
} from '../types/orders';

describe('ordersReducer (rootReducer)', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    isConnection: false,
    hasConnectionFailed: false,
    total: 0,
    totalToday: 0,
  };

  it('обрабатывает WS_SUCCESS', () => {
    const action = { type: WS_SUCCESS } as any;
    const state = ordersReducer(initialState, action);
    expect(state.isConnection).toBe(true);
    expect(state.hasConnectionFailed).toBe(false);
  });

  it('обрабатывает WS_ERROR', () => {
    const action = { type: WS_ERROR } as any;
    const state = ordersReducer({ ...initialState, isConnection: true }, action);
    expect(state.hasConnectionFailed).toBe(true);
    // при WS_ERROR флаг соединения обычно не сбрасывается
    expect(state.isConnection).toBe(true);
  });

  it('обрабатывает WS_CLOSED', () => {
    const action = { type: WS_CLOSED } as any;
    const state = { ...initialState, isConnection: true };
    const result = ordersReducer(state, action);
    expect(result.isConnection).toBe(false);
  });

  it('возвращает state по умолчанию при неизвестном экшене', () => {
    // Здесь тип action привожу к any, чтобы избежать ошибки TS
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const state = ordersReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});