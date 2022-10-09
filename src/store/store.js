import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit"; 
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "@redux-saga/core";
import {all, call} from 'redux-saga/effects'
import  userReducer  from "./user/user.Slice";
import categoriesReducer from "./categories/categories.slice"
import cartReducer from "./cart/cart.slice"
import { rootSaga } from "./root-saga";
const rootReducer = combineReducers({
        cart : cartReducer,
        user : userReducer,
        categories : categoriesReducer
    })
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['cart', 'user', 'categories']
  }
const persistedReducer = persistReducer(persistConfig, rootReducer )

const sagaMiddleWare = createSagaMiddleware()

export const store = configureStore({
    reducer : persistedReducer
    , middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([logger ,sagaMiddleWare])
}  )

sagaMiddleWare.run(rootSaga)

export const persistor = persistStore(store)

