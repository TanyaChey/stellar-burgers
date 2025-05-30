import * as actions from '../../actions/orders';
import { IOrder } from '../../../utils/types/order';

describe('orders actions', () => {
  const ordersPayload = {
    orders: [
      {
        _id: 'order1',
        ingredients: [],
        status: 'done',
        name: 'Order 1',
        number: 1,
        createdAt: '',
        updatedAt: '',
      },
    ],
    total: 10,
    totalToday: 5,
  };

  test('wsOrdersConnectionStart returns correct action', () => {
    expect(actions.wsOrdersConnectionStart()).toEqual({ type: actions.wsOrdersConnectionStart });
  });

  test('wsOrdersConnectionClosed returns correct action', () => {
    expect(actions.wsOrdersConnectionClosed()).toEqual({ type: actions.wsOrdersConnectionClosed });
  });
});
