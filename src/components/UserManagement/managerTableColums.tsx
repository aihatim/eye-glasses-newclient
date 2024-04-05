import { GetProp } from 'antd';
import { TableProps } from 'antd/es/table';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, 'pagination'>,
  boolean
>;

export interface managerTableDataType {
  name: {
    firstName: string;
    lastName: string;
  };
  gender: string;
  email: string;
}

export interface ManagerTableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export const managerTableColumn: ColumnsType<managerTableDataType> = [
  { title: 'Username', key: 'username', dataIndex: 'username' },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (name) => `${name.firstName} ${name.lastName}`,
    width: '20%',
  },
  {
    title: 'Gender',
    key: 'gender',
    dataIndex: 'gender',

    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '10%',
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
    width: '30%',
  },
  {
    title: 'Details',
    key: 'details',
  },
];
