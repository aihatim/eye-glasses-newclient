import { EditOutlined } from '@ant-design/icons';
import { Space, TableProps } from 'antd';
import { TProductColumn } from '../../types/allProduct.types';
import { chooseColor } from '../../utils/chooseColor';
import BulkDeleteInput from './BulkDeleteInput';
import DeleteProduct from './DeleteProduct';
import { DuplicateProductModal } from './DuplicateProductModal';
import SelectAllInput from './SelectAllInput';
import { UpdateModal } from './UpdateModal';

export const productHeaderTable: TableProps<TProductColumn>['columns'] = [
  {
    title: <SelectAllInput />,
    key: 'delete',
    render: (_, record) => (
      <div className='mx-3'>
        <BulkDeleteInput id={record.id} />
      </div>
    ),
  },
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
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Lense',
    dataIndex: 'lenseType',
    key: 'lenseType',
  },
  {
    title: 'Color',
    key: 'color',
    render: (_, record) => (
      <p
        className={`size-5 rounded-full text-transparent ${chooseColor(
          record.color
        )}`}
      >
        .
      </p>
    ),
  },
  {
    title: 'Shape',
    dataIndex: 'shape',
    key: 'shape',
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
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <button>
          <UpdateModal product={record} id={record.id}>
            <EditOutlined />
          </UpdateModal>
        </button>
        <DuplicateProductModal
          product={record}
          id={record.id}
        ></DuplicateProductModal>
        <DeleteProduct id={record.id} />
      </Space>
    ),
  },
];
