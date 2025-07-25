import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './core/App'
import {store} from "./core/store.ts";
import {authService} from "./core/services/auth-service.ts";

// @ts-ignore
const auth = authService;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>,
)