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

  it('добавляет ингредиент', () => {
    const ingredient = { _id: '1', name: 'Соус', type: 'sauce', uuid: 'abc' };
    const action = { type: ADD_INGREDIENT, payload: ingredient };
    const state = burgerReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredient);
  });

  it('удаляет ингредиент по uuid', () => {
    const startState = {
      ...initialState,
      ingredients: [
        { _id: '1', uuid: 'a' },
        { _id: '2', uuid: 'b' },
      ],
    };
    const action = { type: DELETE_INGREDIENT, payload: 'a' };
    const state = burgerReducer(startState, action);
    expect(state.ingredients).toEqual([{ _id: '2', uuid: 'b' }]);
  });

  it('меняет порядок ингредиентов', () => {
    const newOrder = [
      { _id: '2', uuid: 'b' },
      { _id: '1', uuid: 'a' },
    ];
    const action = { type: SORT_INGREDIENTS, payload: newOrder };
    const state = burgerReducer({ ...initialState, ingredients: [] }, action);
    expect(state.ingredients).toEqual(newOrder);
  });
});