// Базовый URL для API
export const BASE_URL: string = 'https://norma.nomoreparties.space/api';

// URL для получения всех заказов через WebSocket
export const ALL_ORDERS_URL: string = 'wss://norma.nomoreparties.space/orders/all';

// URL для получения заказов пользователя через WebSocket
export const USER_ORDERS_URL: string = 'wss://norma.nomoreparties.space/orders';

// Коды ошибок
export const TOKEN_EXPIRED_ERROR: number = 403;
export const UNAUTHORIZED_ERROR: number = 401;

// Константы, представляющие различные типы ингредиентов для вкладок
export enum COMPONENT_TABS {
  bun = 'Булки',
  main = 'Начинки',
  sauce = 'Соусы',
}

// Константа, представляющая смещение вкладок
export const TAB_OFFSET: number = 10;

// Константа, представляющая порог высоты строки
export const ROW_HEIGHT_THRESHOLD: number = 30;

// Константа для установки стандартного срока годности
export const DEFAULT_EXPIRATION_DAYS: number = 7;
export const DEFAULT_EXPIRATION_TIME: number = 20 * 60 * 1000;

// Стандартные данные об ингредиенте, используемые при отсутствии информации
export const DEFAULT_INFO_INGREDIENT: {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
} = {
  _id: '',
  name: 'Информация об ингридиенте не найдена :(',
  type: 'bun',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: 'https://... (ссылка на изображение)',
  image_mobile: 'https://... (ссылка на изображение)',
  image_large: 'https://... (ссылка на изображение)',
  __v: 0,
};

// Статусы заказов
export enum ORDER_STATUSES {
  created = 'created',
  pending = 'pending',
  done = 'done',
  canselled = 'canselled',
}

type ErrorInfo = {
  title: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
};

// Объект с сообщениями об ошибках
export const ERRORS: Record<string, ErrorInfo> = {
  ingredients: {
    title: 'Ошибка при загрузке ингредиентов',
    text: 'Произошла ошибка при получении данных ингредиентов. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при загрузке ингредиентов',
    },
  },
  allOrders: {
    title: 'Ошибка при загрузке списка заказов',
    text: 'Произошла ошибка при получении данных списка заказов. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при загрузке списка заказов',
    },
  },
  userOrders: {
    title: 'Ошибка при получении данных заказов пользователя',
    text: 'Произошла ошибка при получении данных о заказах пользователя. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при получении данных заказов пользователя',
    },
  },
  orderStatus: {
    title: 'Ошибка при получении статуса заказа',
    text: 'Произошла ошибка при получении статуса заказа. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при получении статуса заказа',
    },
  },
  placeOrder: {
    title: 'Ошибка при оформлении заказа',
    text: 'Произошла ошибка при оформлении заказа. Пожалуйста, повторите попытку позже.',
    image: {
      src: 'https://... (ссылка на изображение)',
      alt: 'Ошибка при оформлении заказа',
    },
  },
};

// Имя cookies
export enum TOKEN_NAMES {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
}
