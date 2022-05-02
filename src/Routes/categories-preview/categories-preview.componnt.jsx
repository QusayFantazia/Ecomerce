import { Fragment, useContext, useEffect, useState } from "react";
import {CategoriesContext} from "./../../contexts/categories-context"
import CategoryPreview from "../../Components/category-preview/category-preview.component";
import "./categories-preview.styles.scss"
 const CategoriesPreview = () => {
   
  const {categoriesMap} = useContext(CategoriesContext)

    
    console.log(categoriesMap)
    return(
      <div className="categories-preview">
        { Object.keys(categoriesMap).map(key => 
        <CategoryPreview title={key} products={categoriesMap[key]}> </CategoryPreview>)}
      </div>
    )

}
export default CategoriesPreview;