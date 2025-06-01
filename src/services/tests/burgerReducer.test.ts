import { burgerReducer } from '../reducers/burger';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  DELETE_ALL_INGREDIENTS,
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  SORT_INGREDIENTS,
  SET_ORDER_STATE
} from '../types/burger';
import { IIngredient } from '../../utils/types/ingredients';
import { IUuid } from '../../utils/types/types';

type TIngredientWithUuid = IIngredient & IUuid;

const initialState = {
  bun: null,
  ingredients: [] as TIngredientWithUuid[],
  isRequesting: false,
  hasRequestFailed: false,
  order: null,
  isOrder: false,
};

const mockIngredient = (overrides: Partial<TIngredientWithUuid> = {}): TIngredientWithUuid => ({
  _id: 'id1',
  uuid: 'uuid1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  calories: 100,
  price: 50,
  image: 'img.jpg',
  image_mobile: 'img_m.jpg',
  image_large: 'img_l.jpg',
  __v: 0,
  ...overrides,
});

describe('burgerReducer', () => {
  it('should return initial state', () => {
    expect(burgerReducer(undefined, { type: 'UNKNOWN' as any })).toEqual(initialState);
  });

  it('should handle ADD_INGREDIENT', () => {
    const ingredient = mockIngredient({ uuid: '1' });
    expect(burgerReducer(initialState, { type: ADD_INGREDIENT, payload: ingredient }))
      .toEqual({
        ...initialState,
        ingredients: [ingredient],
      });
  });

  it('should handle ADD_BUN', () => {
    const bun = mockIngredient({ uuid: 'bun1', type: 'bun' });
    expect(burgerReducer(initialState, { type: ADD_BUN, payload: bun })).toEqual({
      ...initialState,
      bun,
    });
  });

  it('should handle DELETE_INGREDIENT', () => {
    const state = {
      ...initialState,
      ingredients: [mockIngredient({ uuid: '1' }), mockIngredient({ uuid: '2' })],
    };
    expect(burgerReducer(state, { type: DELETE_INGREDIENT, payload: '1' })).toEqual({
      ...state,
      ingredients: [mockIngredient({ uuid: '2' })],
    });
  });

  it('should handle DELETE_ALL_INGREDIENTS', () => {
    const state = {
      ...initialState,
      bun: mockIngredient({ uuid: 'bun1', type: 'bun' }),
      ingredients: [mockIngredient({ uuid: '1' })],
    };
    expect(burgerReducer(state, { type: DELETE_ALL_INGREDIENTS })).toEqual({
      ...state,
      bun: {},
      ingredients: [],
    });
  });

  it('should handle SORT_INGREDIENTS', () => {
    const ingredients = [mockIngredient({ uuid: '2' }), mockIngredient({ uuid: '1' })];
    expect(burgerReducer(initialState, { type: SORT_INGREDIENTS, payload: ingredients })).toEqual({
      ...initialState,
      ingredients,
    });
  });

  it('should handle SEND_ORDER', () => {
    expect(burgerReducer(initialState, { type: SEND_ORDER })).toEqual({
      ...initialState,
      isRequesting: true,
      hasRequestFailed: false,
      order: {},
    });
  });

  it('should handle SEND_ORDER_FAILED', () => {
    const state = { ...initialState, isRequesting: true };
    expect(burgerReducer(state, { type: SEND_ORDER_FAILED })).toEqual({
      ...state,
      isRequesting: false,
      hasRequestFailed: true,
    });
  });

  it('should handle SEND_ORDER_SUCCESS', () => {
    const order = 123;
    const state = { ...initialState, isRequesting: true };
    expect(burgerReducer(state, { type: SEND_ORDER_SUCCESS, payload: order })).toEqual({
      ...state,
      isRequesting: false,
      order,
    });
  });

  it('should handle SET_ORDER_STATE', () => {
    expect(burgerReducer(initialState, { type: SET_ORDER_STATE, payload: true })).toEqual({
      ...initialState,
      isOrder: true,
    });
  });
});