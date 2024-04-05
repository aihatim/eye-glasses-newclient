import { Space, TableProps, Tooltip } from 'antd';
import { TProductColumn } from '../../types/allProduct.types';
import SaleManageMentModal from './SaleManageMentModal';

export const saleManagementTableHeader: TableProps<TProductColumn>['columns'] =
  [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price',
      key: 'price',
      render: (_, record) => <p className='text-right'>{record.price} $</p>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },

    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Status',

      key: 'status',
      render: (_, record) => (
        <p
          className={`inline-block text-white px-2 py-1 rounded-lg ${
            record.status === 'in stock' ? ' bg-green-400 ' : ' bg-red-400 '
          }`}
        >
          {record.status}
        </p>
      ),
    },

    {
      title: 'Sell',
      key: 'action',
      render: (_, record) => (
        <Space size='large'>
          <Tooltip
            color={`${record.status === 'out of stock' ? 'red' : 'green'}`}
            placement='top'
            title={`${
              record.status === 'out of stock'
                ? "You can't sell it because of out of stock "
                : 'Sell this Product'
            }`}
          >
            <button disabled={record.status === 'out of stock'} title=''>
              <SaleManageMentModal
                productName={record.name}
                productId={record._id}
                id={record.id}
              />
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];
