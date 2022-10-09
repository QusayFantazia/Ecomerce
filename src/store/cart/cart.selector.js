export const selectCartItems = (state) => state.cart.cartItems

export const selectCartCount = (state) => state.cart.cartItems.length

export const selectCartTotal = (state) => {
    console.log(state.cart.cartItems)
   return state.cart.cartItems.reduce((acc, item) =>  acc + item.price * item.quantity, 0)
}