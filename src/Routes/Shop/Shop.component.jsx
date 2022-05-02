

import {Routes, Route} from "react-router-dom"
import CategoriesPreview from "../categories-preview/categories-preview.componnt"
import { UserContext } from "../../contexts/user-context"
import { CategoriesContext } from "../../contexts/categories-context"
import { useContext } from "react"
import Category from "../../Components/Category/Category.component"

const Shop = () => {
  return(
    <Routes>
      <Route index element={<CategoriesPreview/>}></Route>
      <Route path=":category" element={<Category/>}></Route>
    </Routes>
  )
}

export default Shop