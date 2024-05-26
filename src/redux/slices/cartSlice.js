// rxslice - shortcut i used to create a slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      //checking if there is an existing item
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      //what to do if there is no existing item (totally new Item)
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          quantity: 1,
          totalPrice: Number(newItem.price),
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          total + Number(item.totalPrice) * Number(item.quantity),
        0
      );
      console.log(newItem);
      console.log(state.cartItems.to);
      console.log(state.totalQuantity);
      console.log(state.totalAmount);
    },
    // deleting item from the cart
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          total + Number(item.totalPrice) * Number(item.quantity),
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
