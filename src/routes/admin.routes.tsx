import AddProduct from '../pages/admin/Dashboard/AddProduct';
import AllProducts from '../pages/admin/Dashboard/AllProducts';
import SaleManagement from '../pages/admin/SaleManagement/SaleManagement';
import SellHistory from '../pages/admin/SaleManagement/SellHistory';
import AllManager from '../pages/admin/UserManagement/AllManager';
import AllSeller from '../pages/admin/UserManagement/AllSeller';
import CreateManager from '../pages/admin/UserManagement/CreateManager';
import CreateSeller from '../pages/admin/UserManagement/CreateSeller';

export const adminPaths = [
  // {
  //   name: 'Dashboard',
  //   path: 'dashboard',
  //   element: <AdminDashboard />,
  // },
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

  {
    name: 'User Management',
    children: [
      {
        name: 'Create Manager',
        path: 'create-manager',
        element: <CreateManager />,
      },
      {
        name: 'Managers',
        path: 'all-managers',
        element: <AllManager />,
      },
      {
        name: 'Create User',
        path: 'create-user',
        element: <CreateSeller />,
      },
      {
        name: 'Users',
        path: 'all-users',
        element: <AllSeller />,
      },
      // {
      //   name: 'Sell History',
      //   path: 'sell-management/history',
      //   element: <SellHistory />,
      // },
    ],
  },
  {
    name: 'Sales Management',
    children: [
      {
        name: 'Sell Product',
        path: 'sell-management/sell',
        element: <SaleManagement />,
      },
      {
        name: 'Sell History',
        path: 'sell-management/history',
        element: <SellHistory />,
      },
    ],
  },
];
