import { v4 as generateUniqueId } from 'uuid'; // Импорт функции генерации уникальных идентификаторов из библиотеки uuid
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_ALL_INGREDIENTS,
  DELETE_INGREDIENT,
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  SORT_INGREDIENTS,
  SET_ORDER_STATE,
} from '../types/burger'; // Импорт типов действий из файла с определением типов для бургера
import { IIngredient } from '../../utils/types/ingredients';
import { IUuid } from '../../utils/types/types';

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly payload: IIngredient & IUuid;
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: IIngredient & IUuid;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: string;
}

export interface IDeleteAllIngredientsAction {
  readonly type: typeof DELETE_ALL_INGREDIENTS;
}

export interface ISortIngredientsAction {
  readonly type: typeof SORT_INGREDIENTS;
  readonly payload: (IIngredient & IUuid)[];
}

export interface ISendOrderAction {
  readonly type: typeof SEND_ORDER;
}

export interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}

export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly payload: number;
}

export interface ISetOrderStateAction {
  readonly type: typeof SET_ORDER_STATE;
  readonly payload: boolean;
}

export type TBurgerActions =
  | IAddBunAction
  | IAddIngredientAction
  | IDeleteIngredientAction
  | IDeleteAllIngredientsAction
  | ISortIngredientsAction
  | ISendOrderAction
  | ISendOrderFailedAction
  | ISendOrderSuccessAction
  | ISetOrderStateAction;

// Создание действий (action creators)

// Добавление булки
export const addBun = (ingredient: IIngredient): IAddBunAction => ({
  type: ADD_BUN, // Указание типа действия
  payload: { ...ingredient, uuid: generateUniqueId() }, // Передача данных (полезной нагрузки) в действие, включая уникальный идентификатор
});

// Добавление ингредиента
export const addIngredient = (ingredient: IIngredient): IAddIngredientAction => ({
  type: ADD_INGREDIENT, // Указание типа действия
  payload: { ...ingredient, uuid: generateUniqueId() }, // Передача данных (полезной нагрузки) в действие, включая уникальный идентификатор
});

// Удаление ингредиента по уникальному идентификатору
export const deleteIngredient = (uuid: string): IDeleteIngredientAction => ({ type: DELETE_INGREDIENT, payload: uuid });

// Удаление всех ингредиентов
export const deleteAllIngredients = (): IDeleteAllIngredientsAction => ({ type: DELETE_ALL_INGREDIENTS });

// Сортировка ингредиентов
export const sortIngredients = (newArray: (IIngredient & IUuid)[]): ISortIngredientsAction => ({
  type: SORT_INGREDIENTS,
  payload: newArray,
});

// Отправка заказа
export const sendOrder = (): ISendOrderAction => ({ type: SEND_ORDER });

// Обработка ошибки при отправке заказа
export const sendOrderFailed = (): ISendOrderFailedAction => ({ type: SEND_ORDER_FAILED });

// Успешное завершение отправки заказа с указанием номера заказа
export const sendOrderSuccess = (number: number): ISendOrderSuccessAction => ({
  type: SEND_ORDER_SUCCESS,
  payload: number,
});

export const setOrderState = (state: boolean): ISetOrderStateAction => ({ type: SET_ORDER_STATE, payload: state });
