import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer,userDeleteReducer } from './reducers/userReducers';
import { orderCreateReducer , orderDetailsReducer,orderPayReducer, orderListMyReducer,orderListReducer, orderDeliverReducer } from './reducers/orderReducer';

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,

};

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
  
const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, },
  userLogin: { userInfo: userInfoFromStorage}
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production', // Enable devtools extension in development
  preloadedState: initialState,
});

export default store;


