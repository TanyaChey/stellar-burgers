import { ingredientsReducer } from '../reducers/ingredients';
import {
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
  FETCH_INGREDIENTS_SUCCESS
} from '../types/ingredients';

const initialState = {
  ingredients: [],
  isRequesting: false,
  hasRequestFailed: false,
};

describe('ingredientsReducer', () => {
  it('should return initial state', () => {
    // Передаем действие с типом 'any' для обхода ограничения типов
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
  });

  it('should handle FETCH_INGREDIENTS', () => {
    expect(ingredientsReducer(initialState, { type: FETCH_INGREDIENTS })).toEqual({
      ...initialState,
      isRequesting: true,
      hasRequestFailed: false,
    });
  });

  it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
    const ingredients = [{
      _id: '1',
      name: 'lettuce',
      type: 'vegetable',
      proteins: 0,
      fat: 0,
      carbohydrates: 2,
      calories: 15,
      price: 10,
      image: '',
      image_mobile: '',
      image_large: '',
      __v: 0
    }];
    expect(ingredientsReducer(initialState, { type: FETCH_INGREDIENTS_SUCCESS, payload: ingredients })).toEqual({
      ...initialState,
      isRequesting: false,
      ingredients,
    });
  });

  it('should handle FETCH_INGREDIENTS_FAILED', () => {
    const state = { ...initialState, isRequesting: true };
    expect(ingredientsReducer(state, { type: FETCH_INGREDIENTS_FAILED })).toEqual({
      ...state,
      isRequesting: false,
      hasRequestFailed: true,
    });
  });
});