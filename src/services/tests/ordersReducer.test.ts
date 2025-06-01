import { ordersReducer } from '../reducers/orders';
import * as types from '../types/orders';

describe('ordersReducer', () => {
  it('обрабатывает WS_START', () => {
    const result = ordersReducer(undefined, { type: types.WS_START });
    expect(result.isLoading).toBe(true);
  });

  it('обрабатывает WS_GET_ORDERS', () => {
    const payload = {
      orders: [{
        _id: '1',
        __v: 0,
        ingredients: ['ingredient1', 'ingredient2'],
        owner: 'Test User',  // owner - строка
        status: 'done',
        name: 'Order 1',
        number: 1,
        createdAt: '2025-06-01T11:00:00Z',
        updatedAt: '2025-06-01T11:00:00Z',
      }],
      total: 10,
      totalToday: 5,
    };
    const action = { type: types.WS_GET_ORDERS, payload };
    const result = ordersReducer(undefined, action);
    expect(result.orders).toEqual(payload.orders);
  });
});