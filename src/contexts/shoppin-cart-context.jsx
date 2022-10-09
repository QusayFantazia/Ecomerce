import { createContext, useEffect, useReducer } from "react";

export const cartcontxt= createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems : [],
    setCartItems : () => {},
    cartCount : 0,
    cartTotal : 0, 
    addItem: () => {},
    removeItem : () => {},
    clearItem : () => {}
})

const CartActionTypes = {
    SET_Is_CART_OPEN : "SET_Is_CART_OPEN",
    SET_CART_ITEMS : "SET_CART_ITEMS",
    SET_CART_COUNT : "SET_CART_COUNT",
    SET_CART_TOTAL : "SET_CART_TOTAL",
    ADD_ITEM_TO_CART : "ADD_ITEM_TO_CART",
    REMOVE_ITEM_FROM_CART : "REMOVE_ITEM_FROM_CART",
    CLEAR_ITEM_FROM_CART : "CLEAR_ITEM_FROM_CART"

}

const CartReducer = (state, action ) => {
    const {type, payload} = action
    const {cartItems} = state
    switch(type){
    case CartActionTypes.Is_CART_OPEN:
        return{
            ...state,
            isCartOpen : !state.isCartOpen
        }
    
    case CartActionTypes.SET_CART_ITEMS:
        return{
            ...state,
            cartItems : payload
            
        }

    case CartActionTypes.SET_CART_COUNT:
        return{
            ...state,
            cartCount : payload

        }
    case CartActionTypes.SET_CART_TOTAL:
        return{
            ...state,
            cartTotal : payload
        }

    case CartActionTypes.ADD_ITEM_TO_CART:
        const newCartItems = updateCartItems(type, payload, cartItems)
        return {
            ...state,
            cartItems : newCartItems
        }

    case CartActionTypes.REMOVE_ITEM_FROM_CART : 
        const newCartItems1 = updateCartItems(type, payload, cartItems)
        return{
            ...state, 
            cartItems : newCartItems1
        }

    case CartActionTypes.CLEAR_ITEM_FROM_CART:
        const newCartItems2 = updateCartItems(type, payload, cartItems)
        return{
            ...state,
            cartItems : newCartItems2
        }


    default : 
        throw Error(`unhandled type ${type}`)
    }
}


export const addItemToCart = (cartItems, addedCartItem) => {
    // if item is not in the cart make the item
    const found = cartItems.find(item => item.id === addedCartItem.id)


    //if the item is found in the cart we increase quantity by one
    if(found){
         return cartItems.map(item => item.id === addedCartItem.id ? {...item, quantity : item.quantity + 1} : item)
    }
    return [...cartItems, {...addedCartItem, quantity : 1}]
   
}
export const removeItemToCart = (cartItems, removedCartItem) => {
    
    const foundCartItem = cartItems.find(item => item.id === removedCartItem.id)

    if(foundCartItem.quantity === 1){
        const newCartItems = cartItems.filter(item => item.id !== removedCartItem.id)
        return newCartItems
    }
    else{
        return cartItems.map(item => {
            if(item.id === removedCartItem.id){
                return {...item, quantity : item.quantity - 1}
            }
            else {
                return item
            }

        })
    }
}
 
export const clearItemCart = (cartItems, ToClearItem) => {
    const newCartItems =  cartItems.filter(item => item.id !== ToClearItem.id)
    return newCartItems
}
const updateCartItems = (type, payload, cartItems) => {
    switch (type){
        case CartActionTypes.ADD_ITEM_TO_CART :
            const newCartItems1 = addItemToCart(cartItems, payload)
            return newCartItems1

        case CartActionTypes.REMOVE_ITEM_FROM_CART:
            const newCartItems2  = removeItemToCart(cartItems, payload)
            return newCartItems2

        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            const newCartItems3 = clearItemCart(cartItems, payload)
            return newCartItems3
        default:
            throw Error(`unexpected type in the update method ${type}`)
    }
}
export const ShoppingCartProdvider = ({children}) => {
    
    const INITIAL_STATE = {
        isCartOpen : false,
        cartItems : [],
        cartCount : 0,
        cartTotal : 0
    }
    const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE)
    const {cartItems, isCartOpen, cartCount, cartTotal} = state



    const setIsCartOpen = () => {
        dispatch({action : CartActionTypes.Is_CART_OPEN})
    }

    const setCartItems = (newCartItems) => {
        dispatch({action : CartActionTypes.SET_CART_ITEMS, payload : newCartItems})
    }

    const setCartCount = () => {
       if(cartItems.length !== 0){
            dispatch({type : CartActionTypes.SET_CART_COUNT, payload : cartItems.reduce(addToCartCount, 0)})
       }
       else{
            dispatch({type : CartActionTypes.SET_CART_COUNT, payload : 0})
       }
        
    }
    const setCartTotal = () => {
        dispatch({type : CartActionTypes.SET_CART_TOTAL, payload : cartItems.length !== 0 ? cartItems.reduce((acc, item) => {return acc +  item.quantity * item.price }, 0): 0 })
    }
    

    const addToCartCount = (acc, item) => {
        return acc + item.quantity
    }
    useEffect(() => {
        setCartCount()
        setCartTotal()
    }, [cartItems])

    const addItem = (addedItem) =>  dispatch({type : CartActionTypes.ADD_ITEM_TO_CART, payload :addedItem })
    const removeItem = (removedItem) => dispatch({type : CartActionTypes.REMOVE_ITEM_FROM_CART, payload : removedItem})
    const clearItem = (clearedItem) => dispatch({type : CartActionTypes.CLEAR_ITEM_FROM_CART, payload : clearedItem})

    const value = { isCartOpen, setIsCartOpen, cartItems, setCartItems, cartCount, cartTotal, addItem, removeItem,  clearItem}
    return(
        <cartcontxt.Provider value={value}>
            {children}
        </cartcontxt.Provider>
    )

}