import { useDispatch } from "react-redux"


import { addItem, removeItem, clearItem } from "../../store/cart/cart.slice"
import "./checkout-item.styles.scss"
const CheckoutItem = ({cartItem}) => {
    
    const dispatch = useDispatch()
    const {name, imageUrl, quantity, price} = cartItem
    const HandleClearItem = () => {
        dispatch(clearItem(cartItem))
    }
    const HandleIncreaseItem = () => {
        dispatch(addItem(cartItem))
    }
    const HandleDecreaseItem = () => {
        dispatch(removeItem(cartItem))
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