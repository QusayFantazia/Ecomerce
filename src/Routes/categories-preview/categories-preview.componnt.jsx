import CategoryPreview from "../../Components/category-preview/category-preview.component";
import { categoriesMapSelector } from "../../store/categories/categories.selector";
import { useSelector } from "react-redux";
import { categoriesArraySelector } from "../../store/categories/categories.selector";


import "./categories-preview.styles.scss"
import { useEffect } from "react";

 const CategoriesPreview = () => {
   
    const categoriesMap = useSelector(categoriesMapSelector)
    return(
      <div className="categories-preview">

        {
          categoriesMap ? 
            Object.keys(categoriesMap).map(objectKey => 
                 <CategoryPreview key={objectKey} title={objectKey} products={categoriesMap[objectKey]}> </CategoryPreview>)
            
           :
            (<div> No elements</div>)
        }
      </div>
    )

}
export default CategoriesPreview;