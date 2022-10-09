import {all, call} from "redux-saga/effects"
import { categoriesSaga } from './categories/categories.sage'
import { UserSaga } from "./user/user.saga"

export function* rootSaga() {
    yield all([call(categoriesSaga), call(UserSaga)])
}