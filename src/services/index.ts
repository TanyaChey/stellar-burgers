import { TBurgerActions } from './actions/burger';
import { TIngredientsActions } from './actions/ingredients';
import { TOrderActions } from './actions/order';
import { TOrdersActions } from './actions/orders';
import { TTabsActions } from './actions/tabs';
import { TUserActions } from './actions/user';

import { ThunkAction } from 'redux-thunk';

import { rootReducer } from './reducers/';
import { store } from "./store";

// Типизация всех экшенов приложения
type TApplicationActions =
  | TBurgerActions
  | TIngredientsActions
  | TOrderActions
  | TOrdersActions
  | TTabsActions
  | TUserActions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
