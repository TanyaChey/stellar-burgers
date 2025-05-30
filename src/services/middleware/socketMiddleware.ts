import { Middleware } from 'redux';
import cookieManager from '../../utils/cookieManager';
import { TOKEN_NAMES } from '../../utils/constants';

import { RootState } from '../index';

import { IWsOptions } from '../../utils/types/types';

export function socketMiddleware(wsUrl: string, wsActions: IWsOptions): Middleware<{}, RootState> {
  return (store) => (next) => (action) => {
    let socket: WebSocket | null = null;
    const { dispatch } = store;
    const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
    const { type } = action;

    const accessToken = cookieManager.getCookie(TOKEN_NAMES.accessToken);

    if (type === wsInit) {
      const token = accessToken?.replace('Bearer ', '');
      socket = new WebSocket(`${wsUrl}?token=${token}`);
    }

    if (type === onClose) {
      socket && socket.close(1000, 'CLOSE_NORMAL');
    }

    if (socket) {
      socket.onopen = (event) => dispatch({ type: onOpen });

      socket.onerror = (event) => {
        dispatch({ type: onError });
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const { success, ...restParsedData } = JSON.parse(data);
        if (!success) dispatch({ type: onError });
        dispatch({ type: onMessage, payload: restParsedData });
      };

      socket.onclose = (event) => dispatch({ type: onClose, payload: event });
    }

    return next(action);
  };
}
