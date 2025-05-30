import * as actions from '../../actions/ingredients';
import { IIngredient } from '../../../utils/types/ingredients';

describe('ingredients actions', () => {
  test('fetchIngredients returns correct action', () => {
    expect(actions.fetchIngredients()).toEqual({ type: actions.fetchIngredients });
  });

  test('fetchIngredientsSuccess returns correct action', () => {
    const data: IIngredient[] = [{
      _id: '1',
      name: 'Tomato',
      type: 'vegetable',
      proteins: 1,
      fat: 0,
      carbohydrates: 3,
      calories: 20,
      price: 50,
      image: 'image-url',
      image_mobile: 'image-mobile-url',
      image_large: 'image-large-url',
      __v: 0,
    }];
    expect(actions.fetchIngredientsSuccess(data)).toEqual({
      type: actions.fetchIngredientsSuccess,
      payload: data,
    });
  });

  test('fetchIngredientsFailed returns correct action', () => {
    expect(actions.fetchIngredientsFailed()).toEqual({ type: actions.fetchIngredientsFailed });
  });
});
