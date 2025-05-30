import * as actions from '../../actions/burger';
import { IIngredient } from '../../../utils/types/ingredients';

describe('burger actions', () => {
  const ingredient: IIngredient = {
    _id: '1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url',
    __v: 0,
  };

  test('addBun returns correct action', () => {
    const action = actions.addBun(ingredient);
    expect(action.type).toBe(actions.addBun);
    expect(action.payload.name).toBe('Bun');
    expect(typeof action.payload.uuid).toBe('string');
  });

  test('addIngredient returns correct action', () => {
    const action = actions.addIngredient(ingredient);
    expect(action.type).toBe(actions.addIngredient);
    expect(action.payload.name).toBe('Bun');
    expect(typeof action.payload.uuid).toBe('string');
  });

  test('deleteIngredient returns correct action', () => {
    const uuid = 'uuid-123';
    expect(actions.deleteIngredient(uuid)).toEqual({
      type: actions.deleteIngredient,
      payload: uuid,
    });
  });

  test('deleteAllIngredients returns correct action', () => {
    expect(actions.deleteAllIngredients()).toEqual({
      type: actions.deleteAllIngredients,
    });
  });

  test('sortIngredients returns correct action', () => {
    const arr = [{ ...ingredient, uuid: 'uuid-1' }];
    expect(actions.sortIngredients(arr)).toEqual({
      type: actions.sortIngredients,
      payload: arr,
    });
  });

  test('sendOrder returns correct action', () => {
    expect(actions.sendOrder()).toEqual({ type: actions.sendOrder });
  });

  test('sendOrderFailed returns correct action', () => {
    expect(actions.sendOrderFailed()).toEqual({ type: actions.sendOrderFailed });
  });

  test('sendOrderSuccess returns correct action', () => {
    const orderNumber = 123;
    expect(actions.sendOrderSuccess(orderNumber)).toEqual({
      type: actions.sendOrderSuccess,
      payload: orderNumber,
    });
  });

  test('setOrderState returns correct action', () => {
    expect(actions.setOrderState(true)).toEqual({
      type: actions.setOrderState,
      payload: true,
    });
  });
});
