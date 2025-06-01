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

  const fullIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 250,
    price: 100,
    image: 'img.jpg',
    image_mobile: 'img_m.jpg',
    image_large: 'img_l.jpg',
    __v: 0,
  };

  it('обрабатывает FETCH_INGREDIENTS', () => {
    const action = { type: FETCH_INGREDIENTS };
    const state = ingredientsReducer(initialState, action);
    expect(state.isRequesting).toBe(true);
    expect(state.hasRequestFailed).toBe(false);
  });

  it('обрабатывает FETCH_INGREDIENTS_SUCCESS', () => {
    const ingredients = [fullIngredient];
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