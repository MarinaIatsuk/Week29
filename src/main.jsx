import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './styles/index.scss'
import {WordsContextComponent} from './context/wordsContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <WordsContextComponent>
    <App />
    </WordsContextComponent>
  </React.StrictMode>,
)
