// Импорт необходимых действий (actions) из файла burger.js
import { deleteAllIngredients, sendOrder, sendOrderFailed, sendOrderSuccess, setOrderState } from '../actions/burger';

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

import { AppThunk } from '../index';

// Экспорт функции sendNewOrder, принимающей accessToken и ingredients, а возвращающей функцию
export const sendNewOrder = (ingredients: number[]): AppThunk =>
  async (dispatch) => {
    // Диспатч действия sendOrder для уведомления о начале отправки заказа
    dispatch(sendOrder());
    try {
      const accessToken = cookieManager.getCookie(TOKEN_NAMES.accessToken);
      if (!accessToken) throw new CustomError(`Не найден куки файл ${TOKEN_NAMES.accessToken}`, TOKEN_EXPIRED_ERROR);

      // Отправка ингредиентов на сервер с использованием apiService
      const orderData = await apiService.sendIngredients(accessToken, ingredients);

      // Диспатч действия sendOrderSuccess с номером успешно созданного заказа
      dispatch(sendOrderSuccess(orderData.order.number));

      dispatch(setOrderState(true));

      // Диспатч действия deleteAllIngredients для удаления всех ингредиентов из заказа
      dispatch(deleteAllIngredients());
    } catch (error: any) {
      if (error.status === TOKEN_EXPIRED_ERROR || error.status === UNAUTHORIZED_ERROR) {
        await handleTokenRefresh(
          async (newAccessToken: string) => {
            const newOrderData = await apiService.sendIngredients(newAccessToken, ingredients);
            dispatch(sendOrderSuccess(newOrderData.order.number));
          },
          (refreshError: any) => {
            dispatch(sendOrderFailed());
          },
        );
      } else {
        // Диспатч действия sendOrderFailed с переданной ошибкой
        dispatch(sendOrderFailed());
      }
    }
  };
