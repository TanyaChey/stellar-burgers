import * as actions from '../../actions/order';
import { IOrder } from '../../../utils/types/order';

describe('order actions', () => {
  const orderData: IOrder = {
    _id: 'order1',
    ingredients: [],
    status: 'done',
    name: 'Order 1',
    number: 1,
    createdAt: '',
    updatedAt: '',
    owner: 'user1',
    __v: 0,
  };

  test('fetchOrder returns correct action', () => {
    expect(actions.fetchOrder()).toEqual({ type: actions.fetchOrder });
  });

  test('fetchOrderSuccess returns correct action', () => {
    expect(actions.fetchOrderSuccess(orderData)).toEqual({
      type: actions.fetchOrderSuccess,
      payload: orderData,
    });
  });

  test('fetchOrderFailed returns correct action', () => {
    expect(actions.fetchOrderFailed()).toEqual({ type: actions.fetchOrderFailed });
  });
});
