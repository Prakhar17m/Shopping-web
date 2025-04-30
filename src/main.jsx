import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import Context from './utils/Context.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Context>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Context>
)
