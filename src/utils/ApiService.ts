import { exact } from 'prop-types';
import { BASE_URL } from './constants';
import { IIngredientResponse } from './types/ingredients';
import { IOrderResponse, IMyOrderResponse } from './types/order';
import { IUserResponse, IUserOrderResponse } from './types/user';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IRefreshTokenResponse extends ITokens {
  success: boolean;
}

// Класс для работы с API
class ApiService {
  private _baseUrl: string;
  private _apiUrl: string;

  constructor(url: string = BASE_URL) {
    this._baseUrl = url;
    this._apiUrl = `${url}/auth`;
  }

  // Обработка ответа от сервера
  private async _handleResponse<T>(res: Response): Promise<T> {
    try {
      if (res.ok) {
        return await res.json();
      } else {
        throw res;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Получение списка ингредиентов
  async getIngredients(): Promise<IIngredientResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/ingredients`);
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Отправка ингредиентов на сервер
  async sendIngredients(token: string, ids: number[]): Promise<IMyOrderResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          ingredients: ids,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Получение информации о заказе по номеру
  async getOrderInfo(number: string): Promise<IOrderResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/orders/${number}`);
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Отправка запроса на сброс пароля по email
  async sendEmail(email: string): Promise<IUserResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Сброс пароля с использованием токена
  async resetPassword(token?: string, password?: string): Promise<IUserResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          token,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Вход пользователя
  async login({ email, password }: { email?: string; password?: string }): Promise<IUserResponse & ITokens> {
    try {
      const res = await fetch(`${this._apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Регистрация нового пользователя
  async register({
    email,
    name,
    password,
  }: {
    email?: string;
    name?: string;
    password?: string;
  }): Promise<IUserResponse & ITokens> {
    try {
      const res = await fetch(`${this._apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Получение данных пользователя
  async getUserData(token: string): Promise<IUserResponse> {
    try {
      const res = await fetch(`${this._apiUrl}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Отправка данных пользователя на сервер
  async sendUserData(
    token: string,
    { name, email, password }: { name?: string; email?: string; password?: string },
  ): Promise<IUserResponse> {
    try {
      const res = await fetch(`${this._apiUrl}/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Обновление токена доступа
  async refreshToken(token: string): Promise<IRefreshTokenResponse> {
    try {
      const res = await fetch(`${this._apiUrl}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Выход пользователя
  async logout(token: string): Promise<IUserResponse> {
    try {
      const res = await fetch(`${this._apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      });
      return this._handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

// Создание экземпляра ApiService с базовым URL
export default new ApiService();
