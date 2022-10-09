import "./Category.styles.scss"
import { useContext, useEffect, useState, Fragment} from "react"
import { CategoriesContext } from "../../contexts/categories-context"
import { useParams } from "react-router-dom"
import ProductCard from "../product-card/product-card.component"

import { categoriesMapSelector, loadingStatusSelector} from "../../store/categories/categories.selector"
import { LOADING_STATUS } from "../../store/categories/categories.slice"
import { useSelector } from "react-redux"

import Spinner from "../spinner/spinner.component"

const Category = () => {

  console.log("rendering the category")
    const { category } = useParams();
    const categoriesMap  = useSelector(categoriesMapSelector)

    const LoadingStatus = useSelector(loadingStatusSelector)

    const [products, setProducts] = useState(categoriesMap ? categoriesMap[category] : null);
  
    useEffect(() => {
      console.log("use effect is run ")
      categoriesMap ? setProducts(categoriesMap[category]) : console.log("no categories yet");
    }, [category, categoriesMap]);

    return (

      LoadingStatus == LOADING_STATUS.LOADING ?
      <Spinner/> 
      :(<Fragment>
          <h2> title</h2>
        <div className="Category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </Fragment>)
      
    );
  };
  
  export default Category;