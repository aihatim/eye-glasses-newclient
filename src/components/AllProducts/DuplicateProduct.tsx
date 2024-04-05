import { CopyTwoTone, SyncOutlined } from '@ant-design/icons';
import { useDuplicateProductMutation } from '../../redux/features/product/productApi';
import asyncHandler from '../../utils/asyncHandler';

export default function DuplicateProduct({ id }: { id: string }) {
  const [duplicateProduct, { isLoading }] = useDuplicateProductMutation();
  const handleDuplicate = async () => {
    await asyncHandler({
      res: duplicateProduct(id).unwrap(),
      toastText: 'duplicate product',
    });
  };
  return (
    <button onClick={handleDuplicate}>
      {isLoading ? (
        <SyncOutlined className='text-blue-500' spin />
      ) : (
        <CopyTwoTone />
      )}
    </button>

  );
}




