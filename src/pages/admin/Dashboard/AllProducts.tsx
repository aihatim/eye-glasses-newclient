/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd';
import { useState } from 'react';
import FilterProduct from '../../../components/AllProducts/FilterProduct';
import { productHeaderTable } from '../../../components/AllProducts/productHeaderTable';
import EGError from '../../../components/ui/EGError';
import EGLoading from '../../../components/ui/EGLoading';

import { useGetAllProductsQuery } from '../../../redux/features/product/productApi';

export default function AllProducts() {
  const [filterQuery, setFilterQuery] = useState({});

  const {
    data: productRes,
    isLoading,
    isFetching,
    error,
  } = useGetAllProductsQuery(filterQuery, { refetchOnMountOrArgChange: true });
  const { data } = productRes || {};
  const modifiedData = data?.map((product: any) => ({
    quantity: product.quantity,
    name: product.name,
    color: product.color,
    brand: product.brand.brand,
    gender: product.gender,
    material: product.material,
    price: product.price,
    id: product.id,
    shape: product.shape,
    lenseType: product?.lenseType,
  }));
  let content = null;
  if (isLoading && !error) {
    content = <EGLoading />;
  }
  if (!isLoading && error) {
    const { data: errorData } = (error as { data: { message: string } }) || {};

    content = <EGError message={errorData?.message} />;
  }
  if (!isLoading && !error) {
    content = (
      <>
        <FilterProduct setFilterQuery={setFilterQuery} />
        <div className='overflow-x-auto'>
          <Table
            loading={isFetching}
            dataSource={modifiedData}
            className='capitalize'
            columns={productHeaderTable}
          />
        </div>
      </>
    );
  }
  return <>{content}</>;
}
