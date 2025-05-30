// rootReducer - корневой редюсер, объединяющий все редюсеры в приложении
import { rootReducer } from './reducers/index';

// Redux Thunk - middleware для обработки асинхронных действий в Redux
import thunk from 'redux-thunk';

// Импорт констант для URL-ов WebSocket соединений
import { ALL_ORDERS_URL, USER_ORDERS_URL } from '../utils/constants';

// Импорт middleware для WebSocket соединения
import { socketMiddleware } from './middleware/socketMiddleware';

// Импорт типов действий для WebSocket соединения с заказами
import * as orderActionTypes from './types/orders';

// Импорт типов действий для WebSocket соединения с пользовательскими заказами
import * as userActionTypes from './types/user';

import { configureStore } from '@reduxjs/toolkit';

// Объект с действиями для WebSocket соединения с заказами
const wsActions = {
  wsInit: orderActionTypes.WS_START,
  onOpen: orderActionTypes.WS_SUCCESS,
  onClose: orderActionTypes.WS_CLOSED,
  onError: orderActionTypes.WS_ERROR,
  onMessage: orderActionTypes.WS_GET_ORDERS,
};

// Объект с действиями для WebSocket соединения с пользовательскими заказами
const wsPersonalActions = {
  wsInit: userActionTypes.WS_START,
  onOpen: userActionTypes.WS_SUCCESS,
  onClose: userActionTypes.WS_CLOSED,
  onError: userActionTypes.WS_ERROR,
  onMessage: userActionTypes.WS_GET_ORDERS,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      thunk,
      socketMiddleware(ALL_ORDERS_URL, wsActions),
      socketMiddleware(USER_ORDERS_URL, wsPersonalActions),
    ),
  devTools: process.env.NODE_ENV !== 'production',
});
