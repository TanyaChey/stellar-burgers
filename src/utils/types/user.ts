export interface IUser {
  email: string;
  name: string;
}

export interface IUserResponse {
  success: boolean;
  user: IUser;
}

export interface IUserOrderResponse {
  success: boolean;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
