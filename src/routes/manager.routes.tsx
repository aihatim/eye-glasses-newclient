import AddProduct from '../pages/admin/Dashboard/AddProduct';
import AllProducts from '../pages/admin/Dashboard/AllProducts';

import AllUsers from '../pages/manager/UserManagement/AllUsers';
import CreateUser from '../pages/manager/UserManagement/CreateUser';

export const managerPaths = [
  {
    name: 'User Management',
    children: [
      {
        name: 'Create User',
        path: 'create-user',
        element: <CreateUser />,
      },
      {
        name: 'Users',
        path: 'all-users',
        element: <AllUsers />,
      },
    ],
  },
  {
    name: 'Product Management',
    children: [
      {
        name: 'Add Product',
        path: 'add-product',
        element: <AddProduct />,
      },
      {
        name: 'All Products',
        path: 'all-products',
        element: <AllProducts />,
      },
    ],
  },
];
