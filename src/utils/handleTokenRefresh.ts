// Импорт объекта apiService из утилиты ApiService
import apiService from './ApiService';
// Импорт объекта cookieManager из утилиты cookieManager
import cookieManager from './cookieManager';
// Импорт константы имени куки для обновления токена
import { TOKEN_NAMES } from './constants';

// Обновление refreshToken
export default async function handleTokenRefresh(
  onSuccess: (accessToken: string) => void,
  onFailed: (error: any) => void,
) {
  try {
    const token = cookieManager.getCookie(TOKEN_NAMES.refreshToken);
    if (!token) {
      throw new Error(`Не найден куки файл ${TOKEN_NAMES.refreshToken}`);
    }
    const { accessToken, refreshToken } = await apiService.refreshToken(token);
    // Установка refreshToken и accessToken в cookie
    cookieManager.setCookie(TOKEN_NAMES.refreshToken, refreshToken);
    cookieManager.setCookieWithCustomExpiration(TOKEN_NAMES.accessToken, accessToken);
    onSuccess(accessToken); // Вызов переданной функции успеха
  } catch (error) {
    onFailed(error);
  }
}
