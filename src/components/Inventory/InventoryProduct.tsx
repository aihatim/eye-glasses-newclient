/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd';
import { useGetSellerInventoryQuery } from '../../redux/features/product/productApi';
import { productHeaderTable } from '../AllProducts/productHeaderTable';
import EGError from '../ui/EGError';
import EGLoading from '../ui/EGLoading';

export default function InventoryProduct() {
  const {
    data: InventoryRes,
    isLoading,
    isFetching,
    error,
  } = useGetSellerInventoryQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const { data } = InventoryRes || {};
  const modifiedData = data?.map((inventory: any) => {
    const { product } = inventory;
    return {
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
    };
  });
  let content = null;
  if (isLoading && !error) {
    content = <EGLoading />;
  }
  if (!isLoading && error) {
    const { data: errorData } = (error as { data: { message: string } }) || {};
    content = <EGError message={errorData?.message || data?.message} />;
  }
  if (!isLoading && !error) {
    content = (
      <>
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
