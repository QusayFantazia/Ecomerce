
import { useSelector } from "react-redux"

import PaymentForm from "./../../Components/payment-form/payment-form.component"
import CheckoutItem from "../../Components/checkout-item/checkout-item.component"
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector"


import "./checkout.styles.scss"
const Checkout = () => {

    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

 

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

            <PaymentForm/>
        </div>
    )
}
export default Checkout;