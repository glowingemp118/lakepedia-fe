import './styles/globals.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from "./store/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={30000} />
      <Auth0Provider  clientId={import.meta.env.VITE_AUTH0_CLIENT_ID!} domain={import.meta.env.VITE_AUTH0_DOMAIN!} authorizationParams={{redirect_uri: "http://localhost:5173/auth/signin"}}>
      <App />
      </Auth0Provider>
    </Provider>
  </StrictMode>,
);
