import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { GithubProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-cjw81cev.us.auth0.com'
      clientId='hbmy9F4vzC8HaJRzrPnOxyT2v3Tb5pug'
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation='localstorage'
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
)
