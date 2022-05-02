import { useContext } from "react"

import {Button, Button_Type_classes } from "../button/button.component"
import "./product-card.styles.scss"
import { cartcontxt } from "../../contexts/shoppin-cart-context"
const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product;
    const {addCartItems} = useContext(cartcontxt)
    const addItemToCart = () => {
        addCartItems(product)
    }
    return(
        <div className="product-card-container">
            <img src={imageUrl} alt={name}></img>
            <div className="footer">
                <span>{name}</span>
                <span>{price}</span>
            </div>
            <Button typeButton={Button_Type_classes.base} handelClick={addItemToCart} >Add TO Cart</Button>
        </div>
    )
}

export default ProductCard