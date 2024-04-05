import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { routeGenerator } from '../utils/routesGenerator';
import { adminPaths } from './admin.routes';
import { managerPaths } from './manager.routes';
import { sellerPaths } from './seller.routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: '/manager',
    element: <App />,
    children: routeGenerator(managerPaths),
  },
  {
    path: '/seller',
    element: <App />,
    children: routeGenerator(sellerPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
