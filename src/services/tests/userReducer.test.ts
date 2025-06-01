import { userReducer } from '../reducers/user';
import * as types from '../types/user';

const initialState = {
  isRequestingRegistration: false,
  hasRequestRegistrationFailed: false,
  isRequestingLogin: false,
  hasRequestLoginFailed: false,
  isRequestingForgotPassword: false,
  hasRequestForgotPasswordFailed: false,
  isRequestingResetPassword: false,
  hasRequestResetPasswordFailed: false,
  isRequestingGetUserData: true,
  hasRequestGetUserDataFailed: false,
  isRequestingLogout: false,
  hasRequestLogoutFailed: false,
  isRequestingSendUserData: false,
  hasRequestSendUserDataFailed: false,
  isPasswordForgot: false,
  isLoading: false,
  isConnection: false,
  hasConnectionFailed: false,
  orders: [],
  information: null,
};

describe('userReducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
  });

  it('should handle START_REGISTRATION', () => {
    expect(userReducer(initialState, { type: types.START_REGISTRATION })).toEqual({
      ...initialState,
      isRequestingRegistration: true,
      hasRequestRegistrationFailed: false,
    });
  });

  it('should handle REGISTRATION_SUCCESS', () => {
    const user = {
      id: 1,
      name: 'User',
      email: 'user@example.com',
      // Добавь другие обязательные поля IUser, если есть
    };
    const state = { ...initialState, isRequestingRegistration: true };
    expect(userReducer(state, { type: types.REGISTRATION_SUCCESS, payload: user })).toEqual({
      ...state,
      isRequestingRegistration: false,
      information: user,
    });
  });

  it('should handle REGISTRATION_FAILED', () => {
    const state = { ...initialState, isRequestingRegistration: true };
    expect(userReducer(state, { type: types.REGISTRATION_FAILED })).toEqual({
      ...state,
      isRequestingRegistration: false,
      hasRequestRegistrationFailed: true,
    });
  });

  it('should handle START_LOGIN', () => {
    expect(userReducer(initialState, { type: types.START_LOGIN })).toEqual({
      ...initialState,
      isRequestingLogin: true,
      hasRequestLoginFailed: false,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const user = {
      id: 2,
      name: 'Another User',
      email: 'another@example.com',
      // Добавь другие обязательные поля IUser, если есть
    };
    const state = { ...initialState, isRequestingLogin: true };
    expect(userReducer(state, { type: types.LOGIN_SUCCESS, payload: user })).toEqual({
      ...state,
      isRequestingLogin: false,
      information: user,
    });
  });

  it('should handle LOGIN_FAILED', () => {
    const state = { ...initialState, isRequestingLogin: true };
    expect(userReducer(state, { type: types.LOGIN_FAILED })).toEqual({
      ...state,
      isRequestingLogin: false,
      hasRequestLoginFailed: true,
    });
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const state = { ...initialState, isRequestingForgotPassword: true };
    expect(userReducer(state, { type: types.FORGOT_PASSWORD_SUCCESS })).toEqual({
      ...state,
      isRequestingForgotPassword: false,
      isPasswordForgot: false, // исправлено
    });
  });

  it('should handle SET_FORGOT_PASSWORD_STATE', () => {
    expect(userReducer(initialState, { type: types.SET_FORGOT_PASSWORD_STATE, payload: true })).toEqual({
      ...initialState,
      isPasswordForgot: true,
    });
  });

  it('should handle WS_START', () => {
    expect(userReducer(initialState, { type: types.WS_START })).toEqual({
      ...initialState,
      isLoading: true,
      isConnection: false,
      hasConnectionFailed: false,
      orders: [],
    });
  });

  it('should handle WS_SUCCESS', () => {
    expect(userReducer(initialState, { type: types.WS_SUCCESS })).toEqual({
      ...initialState,
      isConnection: true,
    });
  });

  it('should handle WS_ERROR', () => {
    expect(userReducer(initialState, { type: types.WS_ERROR })).toEqual({
      ...initialState,
      hasConnectionFailed: true,
    });
  });
});