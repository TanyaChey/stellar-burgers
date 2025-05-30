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

import { TUserActions } from '../actions/user';

type TUserState = {
  isRequestingRegistration: boolean;
  hasRequestRegistrationFailed: boolean;
  isRequestingLogin: boolean;
  hasRequestLoginFailed: boolean;
  isRequestingForgotPassword: boolean;
  hasRequestForgotPasswordFailed: boolean;
  isRequestingResetPassword: boolean;
  hasRequestResetPasswordFailed: boolean;
  isRequestingGetUserData: boolean;
  hasRequestGetUserDataFailed: boolean;
  isRequestingLogout: boolean;
  hasRequestLogoutFailed: boolean;
  isRequestingSendUserData: boolean;
  hasRequestSendUserDataFailed: boolean;
  isPasswordForgot: boolean;
  isLoading: boolean;
  isConnection: boolean;
  hasConnectionFailed: boolean;
  orders: IOrder[];
  information: IUser | null;
};

const initialState: TUserState = {
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

export const userReducer = (state = initialState, actions: TUserActions) => {
  switch (actions.type) {
    case START_REGISTRATION: {
      return {
        ...state,
        isRequestingRegistration: true,
        hasRequestRegistrationFailed: false,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        isRequestingRegistration: false,
        information: actions.payload,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        isRequestingRegistration: false,
        hasRequestRegistrationFailed: true,
      };
    }
    case START_LOGIN: {
      return {
        ...state,
        isRequestingLogin: true,
        hasRequestLoginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isRequestingLogin: false,
        information: actions.payload,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isRequestingLogin: false,
        hasRequestLoginFailed: true,
      };
    }
    case START_FORGOT_PASSWORD: {
      return {
        ...state,
        isRequestingForgotPassword: true,
        hasRequestForgotPasswordFailed: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isRequestingForgotPassword: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        isRequestingForgotPassword: false,
        hasRequestForgotPasswordFailed: true,
      };
    }
    case START_RESET_PASSWORD: {
      return {
        ...state,
        isRequestingResetPassword: true,
        hasRequestResetPasswordFailed: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isRequestingResetPassword: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        isRequestingResetPassword: false,
        hasRequestResetPasswordFailed: true,
      };
    }
    case GET_USER_DATA: {
      return {
        ...state,
        isRequestingGetUserData: true,
        hasRequestGetUserDataFailed: false,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        isRequestingGetUserData: false,
        information: actions.payload,
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        isRequestingGetUserData: false,
        hasRequestGetUserDataFailed: true,
      };
    }
    case START_LOGOUT: {
      return {
        ...state,
        isRequestingLogout: true,
        hasRequestLogoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isRequestingLogout: false,
        information: null,
        accessToken: null,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        isRequestingLogout: false,
        hasRequestLogoutFailed: true,
      };
    }
    case SEND_USER_DATA: {
      return {
        ...state,
        isRequestingSendUserData: true,
        hasRequestSendUserDataFailed: false,
      };
    }
    case SEND_USER_DATA_SUCCESS: {
      return {
        ...state,
        isRequestingSendUserData: false,
        information: actions.payload,
      };
    }
    case SEND_USER_DATA_FAILED: {
      return {
        ...state,
        isRequestingSendUserData: false,
        hasRequestSendUserDataFailed: true,
      };
    }
    case SET_FORGOT_PASSWORD_STATE: {
      return {
        ...state,
        isPasswordForgot: actions.payload,
      };
    }
    case WS_START:
      return {
        ...state,
        isLoading: true,
        isConnection: false,
        hasConnectionFailed: false,
        orders: [],
      };
    case WS_SUCCESS:
      return {
        ...state,
        isConnection: true,
      };
    case WS_ERROR:
      return {
        ...state,
        hasConnectionFailed: true,
      };
    case WS_GET_ORDERS: {
      return {
        ...state,
        isLoading: false,
        hasConnectionFailed: false,
        orders: [...actions.payload.orders],
      };
    }
    case WS_CLOSED:
      return {
        ...state,
        isLoading: false,
        isConnection: false,
      };
    default: {
      return state;
    }
  }
};
