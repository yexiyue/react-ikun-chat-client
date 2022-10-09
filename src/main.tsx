import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux'
import { store } from './store'
import {BrowserRouter as Router} from 'react-router-dom'

//移动端适配

document.documentElement.style.fontSize=100/750+'vw';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
