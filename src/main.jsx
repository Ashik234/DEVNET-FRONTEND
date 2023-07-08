import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Store,persistor } from './Redux/store.js'

const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={client_id}>
        <ToastContainer/>      
          <App />
      </GoogleOAuthProvider>
      </PersistGate>  
    </Provider>
  </>
)
