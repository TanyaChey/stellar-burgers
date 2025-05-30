// Действия аутентификации
export const START_REGISTRATION: 'START_REGISTRATION' = 'START_REGISTRATION'; // Начало процесса регистрации
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS'; // Успешная регистрация
export const REGISTRATION_FAILED: 'REGISTRATION_FAILED' = 'REGISTRATION_FAILED'; // Неудачная регистрация

export const START_LOGIN: 'START_LOGIN' = 'START_LOGIN'; // Начало процесса входа в систему
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS'; // Успешный вход в систему
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED'; // Неудачный вход в систему

export const START_FORGOT_PASSWORD: 'START_FORGOT_PASSWORD' = 'START_FORGOT_PASSWORD'; // Начало процесса восстановления пароля
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS'; // Успешное восстановление пароля
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED'; // Неудачное восстановление пароля

export const START_RESET_PASSWORD: 'START_RESET_PASSWORD' = 'START_RESET_PASSWORD'; // Начало процесса сброса пароля
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS'; // Успешный сброс пароля
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED'; // Неудачный сброс пароля

// Действия с данными пользователя
export const GET_USER_DATA: 'GET_USER_DATA' = 'GET_USER_DATA'; // Получение данных пользователя
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS'; // Успешное получение данных пользователя
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED'; // Неудачное получение данных пользователя

export const SEND_USER_DATA: 'SEND_USER_DATA' = 'SEND_USER_DATA'; // Отправка данных пользователя
export const SEND_USER_DATA_SUCCESS: 'SEND_USER_DATA_SUCCESS' = 'SEND_USER_DATA_SUCCESS'; // Успешная отправка данных пользователя
export const SEND_USER_DATA_FAILED: 'SEND_USER_DATA_FAILED' = 'SEND_USER_DATA_FAILED'; // Неудачная отправка данных пользователя

// Действия выхода из системы
export const START_LOGOUT: 'START_LOGOUT' = 'START_LOGOUT'; // Начало процесса выхода из системы
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS'; // Успешный выход из системы
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED'; // Неудачный выход из системы

// Другие действия
export const SET_FORGOT_PASSWORD_STATE: 'SET_FORGOT_PASSWORD_STATE' = 'SET_FORGOT_PASSWORD_STATE'; // Установка состояния восстановления пароля

// Действия WebSocket
export const WS_START: 'WS_USER_START' = 'WS_USER_START'; // Начало процесса подключения WebSocket для пользователя
export const WS_SUCCESS: 'WS_USER_SUCCESS' = 'WS_USER_SUCCESS'; // Успешное подключение WebSocket для пользователя
export const WS_ERROR: 'WS_USER_ERROR' = 'WS_USER_ERROR'; // Ошибка подключения WebSocket для пользователя
export const WS_CLOSED: 'WS_USER_CLOSED' = 'WS_USER_CLOSED'; // Закрытие подключения WebSocket для пользователя
export const WS_GET_ORDERS: 'WS_GET_USER_ORDERS' = 'WS_GET_USER_ORDERS'; // Получение заказов пользователя через WebSocket
