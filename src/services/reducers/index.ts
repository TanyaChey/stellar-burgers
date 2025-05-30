import { combineReducers } from 'redux';

// Подключение отдельных редюсеров
import { ingredientsReducer } from './ingredients';
import { burgerReducer } from './burger';
import { userReducer } from './user';
import { ordersReducer } from './orders';
import { orderReducer } from './order';
import { tabsReducer } from './tabs';

// Корневой редюсер, объединяющий все редюсеры
export const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  burgerData: burgerReducer,
  userData: userReducer,
  ordersData: ordersReducer,
  orderData: orderReducer,
  tabsData: tabsReducer
});
