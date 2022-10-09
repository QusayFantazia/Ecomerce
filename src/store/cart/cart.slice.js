import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'


export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isCartOpen : false,
    cartItems : [],
  },
  reducers: {
    toggleCartIsOpen: (state) => {
      state.isCartOpen  = !state.isCartOpen
    },
    addItem : (state, action) => {
      const {payload} = action
      const foundCartItem = state.cartItems.find(item => item.id === payload.id)
      console.log(foundCartItem)
      if(foundCartItem){
        state.cartItems.map(cartItem => {
          if(cartItem.id === payload.id){
            return cartItem.quantity = cartItem.quantity + 1
          }
          else{
            return {
              ...cartItem
            }
          }
        })
      }
      else{
        state.cartItems.push({...payload, quantity : 1})
      }
      
    },
    removeItem : (state, action) => {
      const {payload} = action
      const foundCartItem = state.cartItems.find(item => item.id === payload.id)
      if(foundCartItem.quantity === 1){
        state.cartItems =   state.cartItems.filter(item =>  {
          console.log(item.id !== payload.id)
          return item.id !== payload.id
        })
      }
      else{
           state.cartItems.map(item => {
              if(item.id === payload.id){
                  return item.quantity = item.quantity - 1
              }
              else {
                  return item
              }
  
          })
      }
    },
    clearItem : (state, action) => {
      const {payload} = action
      const newCartItems =  state.cartItems.filter(item => item.id !== payload.id)
      state.cartItems = newCartItems
    }
  }
})

export const {toggleCartIsOpen, setCartItems, setCartCount, setCartTotal, addItem, removeItem, clearItem } = cartSlice.actions

export default cartSlice.reducer