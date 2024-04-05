import { useGetAllProductsQuery } from '../../redux/features/product/productApi';
import { bulkSelect } from '../../redux/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function SelectAllInput() {
  const { data: productData, isLoading } = useGetAllProductsQuery(undefined,{refetchOnMountOrArgChange:true});
  const id = productData?.data?.map((el: Record<string, unknown>) => el.id);
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state);

  const handleBulkSelect = () => {
    dispatch(bulkSelect(id));
  };
  return (
    <input
      disabled={isLoading}
      type='checkbox'
      checked={product?.length > 0}
      onChange={handleBulkSelect}
      className='mx-3'
    />
  );
}
