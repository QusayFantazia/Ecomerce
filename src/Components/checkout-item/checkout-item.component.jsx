import "./checkout-item.styles.scss"
import { useContext } from "react"
import { cartcontxt } from "../../contexts/shoppin-cart-context"
import { removeItemToCart } from "../../contexts/shoppin-cart-context"
const CheckoutItem = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem
    const  {clearItemFromCart, addCartItems, removeCartItems} = useContext(cartcontxt)
    const HandleClearItem = () => {
        clearItemFromCart(cartItem)
    }
    const HandleIncreaseItem = () => {
        console.log("we are in handle increase")
        addCartItems(cartItem)
    }
    const HandleDecreaseItem = () => {
        console.log("we are in handle decrease")
        removeCartItems(cartItem)
    }   
    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name}></img>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={HandleIncreaseItem}>&#10094;</div>
                 {quantity} 
                <div className="arrow" onClick={HandleDecreaseItem}>&#10095;</div>
            </span>
            <span className="price">
       
                {price}
              
            </span>
            <div className="remove-button" onClick={HandleClearItem}>&#10005;</div>
        </div>
    )
}
export default CheckoutItem;