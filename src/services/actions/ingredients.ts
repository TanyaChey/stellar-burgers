// Импорт типов действий для ингредиентов
import { FETCH_INGREDIENTS, FETCH_INGREDIENTS_FAILED, FETCH_INGREDIENTS_SUCCESS } from '../types/ingredients';
import { IIngredient } from '../../utils/types/ingredients';

export interface IFetchIngredientsAction {
  readonly type: typeof FETCH_INGREDIENTS;
}

export interface IFetchIngredientsSuccessAction {
  readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
}

export interface IFetchIngredientsFailedAction {
  readonly type: typeof FETCH_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IFetchIngredientsAction
  | IFetchIngredientsSuccessAction
  | IFetchIngredientsFailedAction;

// Действие для запроса ингредиентов
export const fetchIngredients = (): IFetchIngredientsAction => ({ type: FETCH_INGREDIENTS });

// Действие при успешном получении ингредиентов
export const fetchIngredientsSuccess = (data: IIngredient[]): IFetchIngredientsSuccessAction => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  payload: data,
});

// Действие при неудачном получении ингредиентов
export const fetchIngredientsFailed = (): IFetchIngredientsFailedAction => ({ type: FETCH_INGREDIENTS_FAILED });
