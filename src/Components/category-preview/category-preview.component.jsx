import { useSelector } from "react-redux"
import ProductCard from "../product-card/product-card.component"
import "./category-preview.styles.scss"
import { LOADING_STATUS } from "../../store/categories/categories.slice"
import { loadingStatusSelector } from "../../store/categories/categories.selector"
import Spinner from "../spinner/spinner.component"

const CategoryPreview = ({title, products}) => {
    const loadingStatus = useSelector(loadingStatusSelector)
    return(
        loadingStatus === LOADING_STATUS.LOADING ? 
        <Spinner/> :
        <div className="category-preview-container">
            <h2>
            <span className="title">{title.toUpperCase()}</span>
            </h2>
            <div className="preview">
             {products.filter((_, index) => index < 4).map(
                 item => <ProductCard key={item.id} product={item}/>
             )}
            </div>
        </div>
    )
}

export default CategoryPreview