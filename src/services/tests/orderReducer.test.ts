import { orderReducer } from '../reducers/order';
import * as types from '../types/order';

describe('orderReducer', () => {
  it('обрабатывает FETCH_ORDER', () => {
    const action = { type: types.FETCH_ORDER };
    const result = orderReducer(undefined, action);
    expect(result).toMatchObject({
      isRequesting: true,
      hasRequestFailed: false,
    });
  });

  it('обрабатывает FETCH_ORDER_SUCCESS', () => {
    const payload = {
      _id: '123',
      __v: 0,
      ingredients: ['ingredient1', 'ingredient2'],
      owner: 'Test User',  // owner - строка
      status: 'done',
      name: 'Test Order',
      number: 123,
      createdAt: '2025-06-01T11:00:00Z',
      updatedAt: '2025-06-01T11:00:00Z',
    };
    const action = { type: types.FETCH_ORDER_SUCCESS, payload };
    const result = orderReducer(undefined, action);
    expect(result.information).toEqual(payload);
  });
});