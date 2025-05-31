import { ingredientsReducer } from '../reducers/ingredients';
import {
  FETCH_INGREDIENTS,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
} from '../types/ingredients';

describe('ingredientsReducer', () => {
  const initialState = {
    ingredients: [],
    isRequesting: false,
    hasRequestFailed: false,
  };

  it('обрабатывает FETCH_INGREDIENTS', () => {
    const action = { type: FETCH_INGREDIENTS };
    const state = ingredientsReducer(initialState, action);
    expect(state.isRequesting).toBe(true);
    expect(state.hasRequestFailed).toBe(false);
  });

  it('обрабатывает FETCH_INGREDIENTS_SUCCESS', () => {
    const ingredients = [{ _id: '1', name: 'Булка' }];
    const action = { type: FETCH_INGREDIENTS_SUCCESS, payload: ingredients };
    const state = ingredientsReducer(initialState, action);
    expect(state.isRequesting).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });

  it('обрабатывает FETCH_INGREDIENTS_FAILED', () => {
    const action = { type: FETCH_INGREDIENTS_FAILED };
    const state = ingredientsReducer(initialState, action);
    expect(state.isRequesting).toBe(false);
    expect(state.hasRequestFailed).toBe(true);
  });
});