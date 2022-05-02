import ProductCard from "../product-card/product-card.component"
import "./category-preview.styles.scss"

const CategoryPreview = ({title, products}) => {
    console.log(title)
    console.log(products)
    return(
        <div className="category-preview-container">
            <h2>
            <span className="title">{title.toUpperCase()}</span>
            </h2>
            <div className="preview">
             {products.filter((_, index) => index < 4).map(
                 (item) => {
                    return <ProductCard key={item.key} product={item}/>
                 }
             )}
            </div>
        </div>
    )
}

export default CategoryPreview