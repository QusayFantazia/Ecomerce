import {useContext  } from "react"
import { useNavigate } from "react-router-dom"

import { cartcontxt } from "../../contexts/shoppin-cart-context"
import CartItem  from "../cart-item/cart-item.component"
import {Button} from "../button/button.component"

import {CartDropdownContainer, EmptyMessage, CartItems}from "./cart-dropdown.styles.jsx"
const CartDropdown = () => {

    const navigate = useNavigate() 

    const moveToCheckoutpage = () => {
        navigate("checkout")
    }

    const  {cartItems}= useContext(cartcontxt)
    console.log(cartItems)
    return(
        <CartDropdownContainer>
            <EmptyMessage></EmptyMessage>
            <CartItems>
            {
                cartItems &&
                cartItems.map(item => <CartItem key = {item.id} cartItem={item}/>)
            }
           
            </CartItems>
            <Button handelClick={moveToCheckoutpage} > checkout</Button>
         </CartDropdownContainer>
    )

}
export default CartDropdown