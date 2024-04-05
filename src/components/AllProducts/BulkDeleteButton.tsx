/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from 'antd';
import { toast } from 'sonner';
import { useBulkProductDeleteMutation } from '../../redux/features/product/productApi';
import { useAppSelector } from '../../redux/hooks';
import { TError } from '../../types';

export default function BulkDeleteButton() {
  const { product } = useAppSelector((state) => state);
  const [bulkDelete, { isLoading }] = useBulkProductDeleteMutation();
  const handleBulkDelete = async () => {
    const deleteToastId = toast.loading('wait trying to add product', {
      duration: 2000,
    });
    try {
      const res = await bulkDelete(product).unwrap();
      toast.success(`${res?.message}`, {
        id: deleteToastId,
        duration: 2000,
      });
    } catch (error: TError | any) {
      toast.error(`${error?.message}`, { id: deleteToastId, duration: 2000 });
    }
  };

  return (
    <>
      <Tooltip placement='top' title='Select One for Delete Item' color='red'>
        <button
          onClick={handleBulkDelete}
          disabled={product.length === 0 || isLoading}
          className='px-3 py-1 rounded-md hover:bg-red-500 my-5 disabled:bg-red-300 duration-150 bg-red-700 text-white'
        >
          Apply Delete
        </button>
      </Tooltip>
    </>
  );
}
