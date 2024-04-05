/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd';
import { useState } from 'react';
import { sellHistoryTableHead } from '../../../components/SellHistory/sellHistoryTableHead';
import EGError from '../../../components/ui/EGError';
import EGLoading from '../../../components/ui/EGLoading';
import { useGetSellsQuery } from '../../../redux/features/sell/sellApi';

export default function SellHistory() {
  const [filter, setFilter] = useState('');
  const {
    data: sellHistory,
    error,
    isLoading,
  } = useGetSellsQuery(filter, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const historyData =
    sellHistory?.data?.map((el: any) => {
      const { productId, sellerId, totalPrice, quantity, sellDate, buyerName } =
        el || {};
      const { id, brand, price, name } = productId || {};
      const data = {
        name,
        price,
        buyerName,
        id,
        brand: brand?.brand,
        totalPrice,
        quantity,
        sellDate,
        sellerName: `${sellerId?.name?.firstName} ${sellerId?.name.lastName}`,
      };
      return data;
    }) || [];
  

  let content = null;
  if (isLoading && !error) {
    content = <EGLoading />;
  }
  if (!isLoading && error) {
    const { data } = error as { data: { message?: string } };
    content = <EGError message={data?.message} />;
  }
  if (!isLoading && !error) {
    content = (
      <>
        <div className='flex justify-end'>
          <div className='max-w-28'>
            <select
              name=''
              id=''
              className='input capitalize'
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value=''>Filter</option>
              <option value='daily'>Daily</option>
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
              <option value='yearly'>Yearly</option>
            </select>
          </div>
        </div>
        <Table
          dataSource={historyData}
          className='capitalize'
          columns={sellHistoryTableHead}
        />
      </>
    );
  }
  return <div className='overflow-x-auto'>{content}</div>;
}
