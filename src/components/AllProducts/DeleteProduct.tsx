/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteTwoTone, SyncOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useDeleteProductMutation } from '../../redux/features/product/productApi';
import asyncHandler from '../../utils/asyncHandler';
import PopConfirm from '../ui/PopConfirm';

export default function DeleteProduct({ id }: { id: string }) {
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const handleDelete = async () => {
    asyncHandler({
      res: deleteProduct(id).unwrap(),
      toastText: 'Delete Product',
    });
  };
  const confirm = (_e: React.MouseEvent<HTMLElement> | undefined) => {
    handleDelete();
  };
  return (
    <>
      <PopConfirm
        placement='leftTop'
        confirm={confirm}
        description='Do you want to delete this Item ?'
        title='Delete The Product!'
      >
        <button disabled={deleteLoading}>
          <Space>
            {deleteLoading ? (
              <SyncOutlined className='text-[#ff0000]' spin />
            ) : (
              <DeleteTwoTone twoToneColor='#ff0000' />
            )}
          </Space>
        </button>
      </PopConfirm>
    </>
  );
}
