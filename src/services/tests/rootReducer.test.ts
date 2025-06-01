import { ordersReducer } from '../reducers/orders';
import {
  WS_SUCCESS,
  WS_ERROR,
} from '../types/orders';

describe('ordersReducer', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    isConnection: false,
    hasConnectionFailed: false,
    total: 0,
    totalToday: 0,
  };

  it('обрабатывает WS_SUCCESS', () => {
    const action = { type: WS_SUCCESS };
    const state = ordersReducer(initialState, action);
    expect(state.isConnection).toBe(true);
  });

  it('обрабатывает WS_ERROR', () => {
    const error = true;
    const action = { type: WS_ERROR, payload: error };
    const state = ordersReducer({ ...initialState, isConnection: true }, action);
    expect(state.hasConnectionFailed).toBe(true);
  });
});