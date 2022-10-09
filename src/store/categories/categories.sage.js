import {all, takeLatest ,call, put} from 'redux-saga/effects'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase'
import { FetchCategoryStart, FetchCategorySuccess, FetchCategoryFailure } from './categories.slice'


export function* fetchCategoriesAsync() {
    try {
        const categoriesArray =  yield call(getCategoriesAndDocuments)
        yield put(FetchCategorySuccess(categoriesArray))
    }catch(error){
        yield put(FetchCategoryFailure(error))
    }
}


export  function* onFetchCategories () {
    yield takeLatest(FetchCategoryStart, fetchCategoriesAsync)
}


export  function* categoriesSaga() {
    yield console.log("we're in categories saga")
    yield all([call(onFetchCategories)])
}