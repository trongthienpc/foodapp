import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {},
    isLoading: false,
  },
  reducers: {
    //  TODO: add to cart
    //  TODO: get cart items

    //  TODO: set is loading
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    //  TODO: remove cart item
  },
});

export const { setIsLoading } = CartSlice.actions;

export default CartSlice.reducer;
