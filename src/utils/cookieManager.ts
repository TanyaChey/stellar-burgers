import { DEFAULT_EXPIRATION_DAYS, DEFAULT_EXPIRATION_TIME } from './constants';

interface ICookieManager {
  setCookie: (name: string, value: string, days?: number) => void;
  setCookieWithCustomExpiration: (name: string, value: string, expirationTimeInMs?: number) => void;
  getCookie: (name: string) => string | null;
  deleteCookie: (name: string) => void;
}

const cookieManager: ICookieManager = {
  // Функция для установки куки
  setCookie: (name, value, days = DEFAULT_EXPIRATION_DAYS) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  },

  // Универсальная функция для установки куки с произвольным временем
  setCookieWithCustomExpiration: (name, value, expirationTimeInMs = DEFAULT_EXPIRATION_TIME) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expirationTimeInMs); // Время в миллисекундах
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  },

  // Функция для получения значения куки по имени
  getCookie: (name) => {
    const cookieName = `${name}=`;
    const cookieArray = document.cookie.split(';');

    for (const cookie of cookieArray) {
      const trimmedCookie = cookie.trim();

      if (trimmedCookie.startsWith(cookieName)) {
        return trimmedCookie.slice(cookieName.length);
      }
    }
    return null;
  },

  // Функция для удаления куки по имени
  deleteCookie: (name) => {
    const expirationDate = new Date(0); // Установка времени истечения в 0
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=; ${expires}; path=/`;
  },
};

export default cookieManager;
