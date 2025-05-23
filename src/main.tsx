import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './sass/global.scss'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import { Provider } from 'react-redux';
import store from './app/store';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
