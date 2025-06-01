import { burgerReducer } from '../reducers/burger';
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from '../types/burger';

describe('burgerReducer', () => {
  const initialState = {
    bun: null,
    ingredients: [],
    isRequesting: false,
    hasRequestFailed: false,
    order: null,
    isOrder: false,
  };

  const fullIngredient = {
    _id: '1',
    name: 'Соус',
    type: 'sauce',
    proteins: 2,
    fat: 1,
    carbohydrates: 5,
    calories: 50,
    price: 30,
    image: 'sauce.jpg',
    image_mobile: 'sauce_mobile.jpg',
    image_large: 'sauce_large.jpg',
    __v: 0,
    uuid: 'abc',
  };

  it('добавляет ингредиент', () => {
    const action = { type: ADD_INGREDIENT, payload: fullIngredient };
    const state = burgerReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(fullIngredient);
  });

  it('удаляет ингредиент по uuid', () => {
    const startState = {
      ...initialState,
      ingredients: [
        { ...fullIngredient, uuid: 'a' },
        { ...fullIngredient, _id: '2', uuid: 'b' },
      ],
    };
    const action = { type: DELETE_INGREDIENT, payload: 'a' };
    const state = burgerReducer(startState, action);
    expect(state.ingredients).toEqual([{ ...fullIngredient, _id: '2', uuid: 'b' }]);
  });

  it('меняет порядок ингредиентов', () => {
    const newOrder = [
      { ...fullIngredient, _id: '2', uuid: 'b' },
      { ...fullIngredient, _id: '1', uuid: 'a' },
    ];
    const action = { type: SORT_INGREDIENTS, payload: newOrder };
    const state = burgerReducer({ ...initialState, ingredients: [] }, action);
    expect(state.ingredients).toEqual(newOrder);
  });
});