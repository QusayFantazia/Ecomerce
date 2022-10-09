import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {getCategoriesAndDocuments} from "./../../utils/firebase/firebase"

// const STATUS_ERROR_ENUM = {
//   // Multiple possible status enum values
//   status: 'idle' | 'loading' | 'succeeded' | 'failed',
//   error: String | null
// }
export const LOADING_STATUS = {
  IDLE : 'idle',
  LOADING : 'loading',
  SUCCEEDED : 'succeeded',
  FAILED : 'failed',

}

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesArray: [],
    status : LOADING_STATUS.IDLE,
    error : null
  },
  reducers: {
    setCategoriesArray: (state, action) => {
      state.categoriesArray  = action.payload
    },
    FetchCategoryStart : (state, action) => {
      state.status = LOADING_STATUS.LOADING
    },
    FetchCategorySuccess : (state, action) => {
      state.status = LOADING_STATUS.SUCCEEDED
      state.categoriesArray = action.payload
    },
    FetchCategoryFailure : (state, action) => {
      state.status = LOADING_STATUS.FAILED
      state.error = action.payload
    }
  }

})

// export const fetchCategoriess = createAsyncThunk('categories/fetchCategoriess', async () => {
//   const response = await getCategoriesAndDocuments()
//   console.log(response.data)
//   return response.data
// })
export const fetchCatgories = createAsyncThunk('categories/fetchcategories', async () => {
  const categoriesArray = await getCategoriesAndDocuments()
  return categoriesArray
})


export const {setCategoriesArray, FetchCategoryStart, FetchCategorySuccess, FetchCategoryFailure} = CategoriesSlice.actions

export default CategoriesSlice.reducer


  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchCatgories.pending, (state, action) => {
  //       state.status = LOADING_STATUS.LOADING
  //     })
  //     .addCase(fetchCatgories.fulfilled, (state, action) => {
  //       state.status = LOADING_STATUS.SUCCEEDED
  //       // Add any fetched posts to the array
  //       state.categoriesArray = action.payload
  //     })
  //     .addCase(fetchCatgories.rejected, (state, action) => {
  //       state.status =LOADING_STATUS.FAILED
  //       state.error = action.payload
  //     })
  // }