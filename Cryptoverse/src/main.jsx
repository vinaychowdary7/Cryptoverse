import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { TransactionProvider } from './context/TransactionContext.jsx'

createRoot(document.getElementById('root')).render(
  <TransactionProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </TransactionProvider>
)
