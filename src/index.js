import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter}from "react-router-dom"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserProvider} from "./contexts/user-context.jsx"
import { CategoriesProvider } from './contexts/categories-context';
import { ShoppingCartProdvider } from './contexts/shoppin-cart-context';
import {store, persistor} from './store/store';
import {stripePromise} from "./utils/stripe/stripe.utils"



ReactDOM.render(
  <React.StrictMode>
    <Provider  store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <UserProvider>
            <CategoriesProvider>
              <ShoppingCartProdvider>
                <Elements stripe={stripePromise} >
                  <App /> 
                </Elements>
              </ShoppingCartProdvider>
            </CategoriesProvider>
          </UserProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
