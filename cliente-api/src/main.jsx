import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';



import { App } from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= {store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>


  </React.StrictMode>
)