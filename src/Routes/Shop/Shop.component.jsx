

import {Routes, Route} from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import CategoriesPreview from "../categories-preview/categories-preview.componnt"
import Category from "../../Components/Category/Category.component"
import { useDispatch } from "react-redux"
import { fetchCatgories } from "../../store/categories/categories.slice"
import { FetchCategoryStart } from "../../store/categories/categories.slice"

const Shop = () => {
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(FetchCategoryStart())
  }, []);
  return(
    <Routes>
      <Route index element={<CategoriesPreview/>}></Route>
      <Route path=":category" element={<Category/>}></Route>
    </Routes>
  )
}

export default Shop