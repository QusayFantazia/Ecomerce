import { createContext, useState, useEffect } from "react";

export const cartcontxt= createContext({
    isCartOpen : false,
    setIsCartOpen: () => {},
    cartItems : [],
    setCartItem : () => {},
    cartCount : 0,
    setCartCount : () => {},
    cartTotal : 0, 
    setCartTotal : () => {},
    addCartItems: () => {},
    removeCartItems : () => {},
    clearItemFromCart : () => {}
})

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
        console.log(cartItems)
        const newCartItems = cartItems.filter(item => item.id !== removedCartItem.id)
        console.log(newCartItems)
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
    console.log(cartItems)
    console.log(ToClearItem)
    const newCartItems =  cartItems.filter(item => item.id !== ToClearItem.id)
    console.log(newCartItems)
    return newCartItems
}
export const ShoppingCartProdvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] =  useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const addCartItems = (AddedCartItem) => {
        const newCartItems = addItemToCart(cartItems, AddedCartItem)
        console.log(newCartItems)
        setCartItems(newCartItems)
    }
    const removeCartItems = (removedCartItem ) => {
        const newCarItems = removeItemToCart(cartItems, removedCartItem)
        setCartItems(newCarItems)
    }
    const clearItemFromCart = (ItemToClear) => {
        const newCartItems = clearItemCart(cartItems, ItemToClear)
        setCartItems(newCartItems)
    }
    useEffect( () =>{
        const newCartCount = cartItems.reduce((total, item ) => total = total + item.quantity , 0)
        setCartCount(newCartCount)
    }
    , [cartItems])
    
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, item) => total = total + item.price * item.quantity, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])
    const value = {isCartOpen, setIsCartOpen, cartItems, setCartItems, cartCount, cartTotal, setCartTotal,setCartCount ,addCartItems, removeCartItems,  clearItemFromCart}
    return(
        <cartcontxt.Provider value={value}>
            {children}
        </cartcontxt.Provider>
    )

}
