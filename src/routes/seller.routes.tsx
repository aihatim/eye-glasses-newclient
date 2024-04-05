import AddProduct from '../pages/admin/Dashboard/AddProduct';
import SaleManagement from '../pages/admin/SaleManagement/SaleManagement';
import Inventory from '../pages/seller/Inventory';
import SellHistory from '../pages/seller/SellHistory';

export const sellerPaths = [
  {
    name: 'Add Inventory',
    path: 'add-Inventory',
    element: <AddProduct />,
  },
  {
    name: 'Inventory ',
    path: 'all-products',
    element: <Inventory />,
  },
  {
    name: 'Sell Management',
    path: 'sell-management',
    element: <SaleManagement />,
  },
  {
    name: 'Sell History',
    path: 'sell-history',
    element: <SellHistory />,
  },
];
