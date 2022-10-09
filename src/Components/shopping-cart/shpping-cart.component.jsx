
import "./shopping-cart.styles.jsx"
import {CartIconContainer, ShoppingIcon, ItemCount} from "./shopping-cart.styles"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { toggleCartIsOpen, increment } from "../../store/cart/cart.slice.js"
import { selectCartCount } from "../../store/cart/cart.selector.js"

const ShoppingCart = () => {

    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)

    const toggleIsCartOpen = () => {
        dispatch(toggleCartIsOpen())
    }

    return(
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className="shopping-icon"/>
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
    )
}
export default ShoppingCart