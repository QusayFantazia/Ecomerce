import "./Category.styles.scss"
import { useContext, useEffect, useState, Fragment} from "react"
import { CategoriesContext } from "../../contexts/categories-context"
import { useParams } from "react-router-dom"
import ProductCard from "../product-card/product-card.component"

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);
  
    useEffect(() => {
      setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);
  
    return (
      <Fragment>
          <h2> title</h2>
        <div className="Category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </Fragment>
    );
  };
  
  export default Category;