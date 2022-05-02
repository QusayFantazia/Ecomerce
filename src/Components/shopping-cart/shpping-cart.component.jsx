
import "./shopping-cart.styles.jsx"
import { useContext } from "react"
import { cartcontxt } from "../../contexts/shoppin-cart-context"
import {CartIconContainer, ShoppingIcon, ItemCount} from "./shopping-cart.styles"

const ShoppingCart = () => {
    const {isCartOpen, setIsCartOpen}=  useContext(cartcontxt)
    const {cartItems, cartCount} = useContext(cartcontxt)

    const toggleIsCartOpen = () => {  
        setIsCartOpen(!isCartOpen)
    }

    return(
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className="shopping-icon"/>
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
    )
}
export default ShoppingCart