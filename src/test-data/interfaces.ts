export interface IUserData {
  username: string;
  password: string;
  expectedError?: string;
  description: string;
}

export interface ICheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface IProductItem {
  name: string;
  price: string;
  description?: string;
}
