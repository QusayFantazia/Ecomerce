import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter}from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserProvider} from "./contexts/user-context.jsx"
import { CategoriesProvider } from './contexts/categories-context';
import { ShoppingCartProdvider } from './contexts/shoppin-cart-context';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <ShoppingCartProdvider>
            <App />
          </ShoppingCartProdvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
