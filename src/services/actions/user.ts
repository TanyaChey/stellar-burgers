import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_DATA,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  SEND_USER_DATA,
  SEND_USER_DATA_FAILED,
  SEND_USER_DATA_SUCCESS,
  SET_FORGOT_PASSWORD_STATE,
  START_FORGOT_PASSWORD,
  START_LOGIN,
  START_LOGOUT,
  START_REGISTRATION,
  START_RESET_PASSWORD,
  WS_CLOSED,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_START,
  WS_SUCCESS,
} from '../types/user';

import { IOrder } from '../../utils/types/order';
import { IUser } from '../../utils/types/user';

export interface IStartForgotPasswordAction {
  readonly type: typeof START_FORGOT_PASSWORD;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

// ====

export interface IStartLoginAction {
  readonly type: typeof START_LOGIN;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: IUser;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

// ====

export interface IStartLogoutAction {
  readonly type: typeof START_LOGOUT;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

// ====

export interface IStartRegistrationAction {
  readonly type: typeof START_REGISTRATION;
}

export interface IRegistrationSuccessAction {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly payload: IUser;
}

export interface IRegistrationFailedAction {
  readonly type: typeof REGISTRATION_FAILED;
}

// ====

export interface IStartResetPaswordAction {
  readonly type: typeof START_RESET_PASSWORD;
}

export interface IResetPaswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPaswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

// ====

export interface ISetForgotPasswordStateAction {
  readonly type: typeof SET_FORGOT_PASSWORD_STATE;
  readonly payload: boolean;
}

// ====

export interface IForgotGetUserDataAction {
  readonly type: typeof GET_USER_DATA;
}

export interface IGetUserDataSuccesssAction {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly payload: IUser;
}

export interface IGetUserDataFailedAction {
  readonly type: typeof GET_USER_DATA_FAILED;
}

// ====

export interface IForgotSendUserDataAction {
  readonly type: typeof SEND_USER_DATA;
}

export interface ISendUserDataSuccessAction {
  readonly type: typeof SEND_USER_DATA_SUCCESS;
  readonly payload: IUser;
}

export interface ISendUserDataFailedAction {
  readonly type: typeof SEND_USER_DATA_FAILED;
}

// ====

export interface IWsUserOrdersConnectionStartAction {
  readonly type: typeof WS_START;
}

export interface IWsUserOrdersConnectionClosedAction {
  readonly type: typeof WS_CLOSED;
}

export interface IGetUserOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: { orders: IOrder[] };
}

export interface IWsUserOrdersConnectionErrorAction {
  readonly type: typeof WS_ERROR;
}

export interface IWsUserOrdersConnectionSuccessAction {
  readonly type: typeof WS_SUCCESS;
}

export type TUserActions =
  | IStartForgotPasswordAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IStartLoginAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | IStartLogoutAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IStartRegistrationAction
  | IRegistrationSuccessAction
  | IRegistrationFailedAction
  | IStartResetPaswordAction
  | IResetPaswordSuccessAction
  | IResetPaswordFailedAction
  | ISetForgotPasswordStateAction
  | IGetUserDataSuccesssAction
  | IGetUserDataFailedAction
  | IForgotGetUserDataAction
  | IForgotSendUserDataAction
  | ISendUserDataSuccessAction
  | ISendUserDataFailedAction
  | IWsUserOrdersConnectionStartAction
  | IWsUserOrdersConnectionClosedAction
  | IGetUserOrdersAction
  | IWsUserOrdersConnectionErrorAction
  | IWsUserOrdersConnectionSuccessAction;

// Действия связанные с восстановлением пароля
export const startForgotPassword = (): IStartForgotPasswordAction => ({ type: START_FORGOT_PASSWORD });
export const forgotPasswordSuccess = (): IForgotPasswordSuccessAction => ({ type: FORGOT_PASSWORD_SUCCESS });
export const forgotPasswordFailed = (): IForgotPasswordFailedAction => ({ type: FORGOT_PASSWORD_FAILED });

// Действия связанные с процессом входа
export const startLogin = (): IStartLoginAction => ({ type: START_LOGIN });
export const loginSuccess = (token: IUser): ILoginSuccessAction => ({ type: LOGIN_SUCCESS, payload: token });
export const loginFailed = (): ILoginFailedAction => ({ type: LOGIN_FAILED });

// Действия связанные с процессом выхода
export const startLogout = (): IStartLogoutAction => ({ type: START_LOGOUT });
export const logoutSuccess = (): ILogoutSuccessAction => ({ type: LOGOUT_SUCCESS });
export const logoutFailed = (): ILogoutFailedAction => ({ type: LOGOUT_FAILED });

// Действия связанные с процессом регистрации
export const startRegistration = (): IStartRegistrationAction => ({ type: START_REGISTRATION });
export const registrationSuccess = (userData: IUser): IRegistrationSuccessAction => ({
  type: REGISTRATION_SUCCESS,
  payload: userData,
});
export const registrationFailed = (): IRegistrationFailedAction => ({ type: REGISTRATION_FAILED });

// Действия связанные с процессом сброса пароля
export const startResetPassword = (): IStartResetPaswordAction => ({ type: START_RESET_PASSWORD });
export const resetPaswordSuccess = (): IResetPaswordSuccessAction => ({ type: RESET_PASSWORD_SUCCESS });
export const resetPaswordFailed = (): IResetPaswordFailedAction => ({ type: RESET_PASSWORD_FAILED });

// Действия связанные с установкой состояния восстановления пароля
export const setForgotPasswordState = (state: boolean): ISetForgotPasswordStateAction => ({
  type: SET_FORGOT_PASSWORD_STATE,
  payload: state,
});

// Действия связанные с получением данных пользователя
export const forgotGetUserData = (): IForgotGetUserDataAction => ({ type: GET_USER_DATA });
export const getUserDataSuccess = (userData: IUser): IGetUserDataSuccesssAction => ({
  type: GET_USER_DATA_SUCCESS,
  payload: userData,
});
export const getUserDataFailed = (): IGetUserDataFailedAction => ({ type: GET_USER_DATA_FAILED });

// Действия связанные с отправкой данных пользователя
export const forgotSendUserData = (): IForgotSendUserDataAction => ({ type: SEND_USER_DATA });
export const sendUserDataSuccess = (userData: IUser): ISendUserDataSuccessAction => ({
  type: SEND_USER_DATA_SUCCESS,
  payload: userData,
});
export const sendUserDataFailed = (): ISendUserDataFailedAction => ({ type: SEND_USER_DATA_FAILED });

// Действия связанные с WebSocket соединением для получения заказов пользователя
export const wsUserOrdersConnectionStart = (): IWsUserOrdersConnectionStartAction => ({ type: WS_START });
export const wsUserOrdersConnectionClosed = (): IWsUserOrdersConnectionClosedAction => ({ type: WS_CLOSED });
export const getUserOrders = (data: { orders: IOrder[] }): IGetUserOrdersAction => ({
  type: WS_GET_ORDERS,
  payload: data,
});
