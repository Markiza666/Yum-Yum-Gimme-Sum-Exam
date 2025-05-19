import { createBrowserRouter } from 'react-router-dom';
import Menu from './vews/Menu';
import Error from './Error';
import { OrderStatus } from './vews/OrderStatus';
import { Receipt } from './vews/Receipt';
import App from './App';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, 
        errorElement: <Error />,
        children: [
            {
                index: true, 
                element: <App />
            },
            {
                path: '/menu',
                element: <Menu />
            },
            {
                path: '/order',
                element: <OrderStatus />
            },
            {
                path: '/receipt',
                element: <Receipt />
            }
        ],
    },
]);
