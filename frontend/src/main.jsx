import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import rootReducer from './reducers/index.js';
import {configureStore} from "@reduxjs/toolkit";

const store=configureStore({
  reducer:rootReducer
})
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
