import { Table } from 'antd';
import { saleManagementTableHeader } from '../../../components/SalesManagement/saleManagementTableHeader';
import EGError from '../../../components/ui/EGError';
import EGLoading from '../../../components/ui/EGLoading';
import { useGetAllProductsQuery } from '../../../redux/features/product/productApi';
import { TProduct } from '../../../types/allProduct.types';
import FilterProduct from '../../../components/AllProducts/FilterProduct';
import { useState } from 'react';

export default function SaleManagement() {
  const [filterQuery, setFilterQuery] = useState({});
  const { data, isLoading, error, isFetching } = useGetAllProductsQuery(
    filterQuery,
    { refetchOnMountOrArgChange: true }
  );
  const productData =
    data?.data?.map((product: TProduct) => ({
      ...product,
      brand: product.brand.brand,
    })) || [];
  let content = null;
  if (isLoading && !error) {
    content = <EGLoading />;
  }
  if (!isLoading && error) {
    const { data } = error as { data: { message: string } };
    content = <EGError message={data?.message} />;
  }

  if (!error && !isLoading) {
    content = (
      <>
      <FilterProduct setFilterQuery={setFilterQuery} />
      <Table
        loading={isFetching}
        dataSource={productData}
        className='capitalize'
        columns={saleManagementTableHeader}
      /></>
    );
  }
  return <div className='overflow-x-auto'>{content}</div>;
}
