import { Space, TableProps } from 'antd';
import moment from 'moment';
import { TProductColumn } from '../../types/allProduct.types';
import PrintInvoice from '../Invoice/PrintInvoice';
import SellHistoryModal from './SellHistoryModal';
export const sellHistoryTableHead: TableProps<TProductColumn>['columns'] = [
  {
    title: 'Product Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Seller Name',
    dataIndex: 'sellerName',
    key: 'sellerName',
  },
  {
    title: 'Buyer Name',
    dataIndex: 'buyerName',
    key: 'buyerName',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Total Amount',
    key: 'totalPrice',
    render: (_, record) => <p>{record.totalPrice} $</p>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Sell Date',
    key: 'sellDate',
    render: (_, record) => (
      <span>{moment(record.sellDate).format('DD-MM-YYYY')}</span>
    ),
  },

  {
    title: 'Action',
    key: 'Details',
    render: (_, record) => (
      <Space size='large'>
        <PrintInvoice product={record}/>
        <button disabled={record.status === 'out of stock'} title=''>
          <SellHistoryModal />
        </button>
      </Space>
    ),
  },
];
