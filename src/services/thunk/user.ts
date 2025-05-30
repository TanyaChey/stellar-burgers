// Импорт объекта apiService из утилиты ApiService
import apiService from '../../utils/ApiService';
// Импорт объекта cookieManager из утилиты cookieManager
import cookieManager from '../../utils/cookieManager';
// Импорт класса cookieManager из утилиты cookieManager
import CustomError from '../../utils/CustomError';
// Импорт функции handleTokenRefresh
import handleTokenRefresh from '../../utils/handleTokenRefresh';

// Импорт константы имени куки для обновления токена
import { TOKEN_NAMES, TOKEN_EXPIRED_ERROR, UNAUTHORIZED_ERROR } from '../../utils/constants';

import {
  forgotGetUserData,
  forgotPasswordFailed,
  forgotPasswordSuccess,
  forgotSendUserData,
  getUserDataFailed,
  getUserDataSuccess,
  loginFailed,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  registrationFailed,
  registrationSuccess,
  resetPaswordFailed,
  resetPaswordSuccess,
  sendUserDataFailed,
  sendUserDataSuccess,
  setForgotPasswordState,
  startForgotPassword,
  startLogin,
  startLogout,
  startRegistration,
  startResetPassword,
} from '../actions/user';

import { AppThunk } from '../index';

// Регистрация нового пользователя
export const registration = ({ email, name, password }: { email?: string; password?: string; name?: string }): AppThunk =>
  async (dispatch) => {
    // Диспатч стартового действия для регистрации
    dispatch(startRegistration());
    try {
      // Вызов API для регистрации
      const registrationData = await apiService.register({ email, name, password });
      // Успешная регистрация - диспатч соответствующего действия
      dispatch(registrationSuccess(registrationData.user));
      // Установка refreshToken и accessToken в cookie
      cookieManager.setCookie(TOKEN_NAMES.refreshToken, registrationData.refreshToken);
      cookieManager.setCookieWithCustomExpiration(TOKEN_NAMES.accessToken, registrationData.accessToken);
    } catch (error) {
      // Обработка ошибки при неудачной регистрации
      dispatch(registrationFailed());
    }
  };

// Вход пользователя
export const login = ({ email, password }: { email?: string; password?: string }): AppThunk =>
  async (dispatch) => {
    dispatch(startLogin());
    try {
      const loginData = await apiService.login({ email, password });
      dispatch(loginSuccess(loginData.user));
      // Установка refreshToken и accessToken в cookie
      cookieManager.setCookie(TOKEN_NAMES.refreshToken, loginData.refreshToken);
      cookieManager.setCookieWithCustomExpiration(TOKEN_NAMES.accessToken, loginData.accessToken);
    } catch (error) {
      dispatch(loginFailed());
    }
  };

// Получение данных пользователя
export const getUserData = (): AppThunk => {
  return async (dispatch) => {
    dispatch(forgotGetUserData());
    try {
      const accessToken = cookieManager.getCookie(TOKEN_NAMES.accessToken);
      if (!accessToken) throw new CustomError(`Не найден куки файл ${TOKEN_NAMES.accessToken}`, TOKEN_EXPIRED_ERROR);
      const userData = await apiService.getUserData(accessToken);
      dispatch(getUserDataSuccess(userData.user));
    } catch (error) {
      dispatch(getUserDataFailed());
    }
  };
};

// Обновление данных пользователя
export const sendUserData = ({ name, email, password }: { name?: string; email?: string; password?: string }): AppThunk =>
  async (dispatch) => {
    dispatch(forgotSendUserData());
    try {
      const accessToken = cookieManager.getCookie(TOKEN_NAMES.accessToken);
      if (!accessToken) throw new CustomError(`Не найден куки файл ${TOKEN_NAMES.accessToken}`, TOKEN_EXPIRED_ERROR);
      const sendData = await apiService.sendUserData(accessToken, { name, email, password });
      dispatch(sendUserDataSuccess(sendData.user));
    } catch (error: any) {
      if (error.status === TOKEN_EXPIRED_ERROR || error.status === UNAUTHORIZED_ERROR) {
        await handleTokenRefresh(
          async (newAccessToken) => {
            const sendData = await apiService.sendUserData(newAccessToken, { name, email, password });
            dispatch(sendUserDataSuccess(sendData.user));
          },
          (refreshError) => {
            dispatch(sendUserDataFailed());
          },
        );
      } else {
        dispatch(sendUserDataFailed());
      }
    }
  };

// Запрос на восстановление пароля
export const forgotPassword = (email: string): AppThunk =>
  async (dispatch) => {
    dispatch(startForgotPassword());
    try {
      await apiService.sendEmail(email);
      dispatch(forgotPasswordSuccess());
      dispatch(setForgotPasswordState(true));
    } catch (error) {
      dispatch(forgotPasswordFailed());
    }
  };

// Сброс пароля
export const resetPassword = ({ code, password }: { code?: string; password?: string }): AppThunk =>
  async (dispatch) => {
    dispatch(startResetPassword());
    try {
      await apiService.resetPassword(code, password);
      dispatch(resetPaswordSuccess());
      dispatch(setForgotPasswordState(false));
    } catch (error) {
      dispatch(resetPaswordFailed());
    }
  };

// Выход пользователя
export const logout = (): AppThunk => async (dispatch) => {
  dispatch(startLogout());
  try {
    const token = cookieManager.getCookie(TOKEN_NAMES.refreshToken);
    if (token === null) throw Error;
    await apiService.logout(token);
    dispatch(logoutSuccess());
    // Удаление refreshToken и accessToken из cookie при выходе
    cookieManager.deleteCookie(TOKEN_NAMES.refreshToken);
    cookieManager.deleteCookie(TOKEN_NAMES.accessToken);
  } catch (error) {
    dispatch(logoutFailed());
  }
};
