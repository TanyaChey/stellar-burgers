import { IIngredient } from './ingredients';
import { IUserOrderResponse } from './user';

export interface IMainOrder {
  _id: string;
  owner: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  __v: number;
}

export interface IOrder extends IMainOrder {
  ingredients: string[];
}

export interface IMyOrderResponse {
  success: boolean;
  name: string;
  order: {
    ingredients: IIngredient[];
    _id: string;
    owner: IUserOrderResponse;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
  };
}

export interface IOrderResponse {
  success: boolean;
  orders: IOrder[];
}
