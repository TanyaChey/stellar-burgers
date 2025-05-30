import * as actions from '../../actions/user';
import { IUser } from '../../../utils/types/user';
import { IOrder } from '../../../utils/types/order';

describe('user actions', () => {
  const user: IUser = {
    email: 'test@example.com',
    name: 'Test User',
  };

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
  };

  test('startForgotPassword returns correct action', () => {
    expect(actions.startForgotPassword()).toEqual({ type: actions.startForgotPassword });
  });

  test('forgotPasswordSuccess returns correct action', () => {
    expect(actions.forgotPasswordSuccess()).toEqual({ type: actions.forgotPasswordSuccess });
  });

  test('forgotPasswordFailed returns correct action', () => {
    expect(actions.forgotPasswordFailed()).toEqual({ type: actions.forgotPasswordFailed });
  });

  test('startLogin returns correct action', () => {
    expect(actions.startLogin()).toEqual({ type: actions.startLogin });
  });

  test('loginSuccess returns correct action', () => {
    expect(actions.loginSuccess(user)).toEqual({ type: actions.loginSuccess, payload: user });
  });

  test('loginFailed returns correct action', () => {
    expect(actions.loginFailed()).toEqual({ type: actions.loginFailed });
  });

  test('startLogout returns correct action', () => {
    expect(actions.startLogout()).toEqual({ type: actions.startLogout });
  });

  test('logoutSuccess returns correct action', () => {
    expect(actions.logoutSuccess()).toEqual({ type: actions.logoutSuccess });
  });

  test('logoutFailed returns correct action', () => {
    expect(actions.logoutFailed()).toEqual({ type: actions.logoutFailed });
  });

  test('startRegistration returns correct action', () => {
    expect(actions.startRegistration()).toEqual({ type: actions.startRegistration });
  });

  test('registrationSuccess returns correct action', () => {
    expect(actions.registrationSuccess(user)).toEqual({ type: actions.registrationSuccess, payload: user });
  });

  test('registrationFailed returns correct action', () => {
    expect(actions.registrationFailed()).toEqual({ type: actions.registrationFailed });
  });

  test('startResetPassword returns correct action', () => {
    expect(actions.startResetPassword()).toEqual({ type: actions.startResetPassword });
  });

  test('setForgotPasswordState returns correct action', () => {
    expect(actions.setForgotPasswordState(true)).toEqual({
      type: actions.setForgotPasswordState,
      payload: true,
    });
  });

  test('getUserDataSuccess returns correct action', () => {
    expect(actions.getUserDataSuccess(user)).toEqual({ type: actions.getUserDataSuccess, payload: user });
  });

  test('getUserDataFailed returns correct action', () => {
    expect(actions.getUserDataFailed()).toEqual({ type: actions.getUserDataFailed });
  });

  test('sendUserDataSuccess returns correct action', () => {
    expect(actions.sendUserDataSuccess(user)).toEqual({ type: actions.sendUserDataSuccess, payload: user });
  });

  test('sendUserDataFailed returns correct action', () => {
    expect(actions.sendUserDataFailed()).toEqual({ type: actions.sendUserDataFailed });
  });
});
