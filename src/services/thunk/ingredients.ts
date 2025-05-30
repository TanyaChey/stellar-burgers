// Импорт необходимых действий (actions) из файла 'ingredients'
import { fetchIngredients, fetchIngredientsFailed, fetchIngredientsSuccess } from '../actions/ingredients';

// Импорт службы API из утилитарного модуля 'ApiService'
import apiService from '../../utils/ApiService';

import { AppThunk } from '../index';

// Экспорт функции для получения ингредиентов
export const getIngredients = (): AppThunk => async (dispatch) => {
  // Диспатчим действие о начале загрузки ингредиентов
  dispatch(fetchIngredients());
  try {
    // Получаем данные об ингредиентах с использованием API-сервиса
    const ingredientsData = await apiService.getIngredients();
    dispatch(fetchIngredientsSuccess(ingredientsData.data));
  } catch (error) {
    // В случае ошибки диспатчим действие об ошибке с передачей объекта ошибки
    dispatch(fetchIngredientsFailed());
  }
};
