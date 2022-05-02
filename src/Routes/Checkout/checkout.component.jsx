
import { UserContext } from "../../contexts/user-context"
import { addItemToCart, cartcontxt } from "../../contexts/shoppin-cart-context"
import { useContext } from "react"

import CheckoutItem from "../../Components/checkout-item/checkout-item.component"
import "./checkout.styles.scss"
const Checkout = () => {
    const {cartItems, addCartItems, removeCartItems, cartTotal} = useContext(cartcontxt)

    const additemFromCheckout = (item) => {
        addCartItems(item)
    }
    const removeItemFromCheckout = (item) => {
        removeCartItems(item)
    }

 

    return(
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
    
            

            <div>
                {cartItems.map(item => (
                    <CheckoutItem key={item.id} cartItem={item} />
                    ))
                }
            </div>
            <span>Total : {cartTotal}</span>
        </div>
    )
}
export default Checkout;