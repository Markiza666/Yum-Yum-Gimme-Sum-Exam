import { RootState } from "../../app/store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalQuantity = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);