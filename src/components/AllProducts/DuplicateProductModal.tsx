/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyTwoTone, SyncOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { lenseType } from '../../constant/addProduct.constant';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useBrandsQuery } from '../../redux/features/brand/brandApi';
import {
  useDuplicateProductMutation,
  useGetSingleProductQuery,
} from '../../redux/features/product/productApi';
import { useAppSelector } from '../../redux/hooks';
import asyncHandler from '../../utils/asyncHandler';
import Input from '../AddProduct/Input';
import SelectBrands from '../AddProduct/SelectBrands';
import SelectColor from '../AddProduct/SelectColor';
import SelectFrameShape from '../AddProduct/SelectFrameShape';
import SelectionOptions from '../AddProduct/SelectionOptions';
import EGForm from '../form/EGForm';
import EGLabel from '../form/EGLabel';

interface TUpdateProduct {
  product: any;
  id: string;
}
export function DuplicateProductModal({ product, id }: TUpdateProduct) {
  const user = useAppSelector(selectCurrentUser);
  const [duplicateProduct, { isLoading: duplicateLoading }] =
    useDuplicateProductMutation();

  const { data: brands, isLoading } = useBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const { data: singleProduct, refetch } = useGetSingleProductQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const {
    color: initialColor,
    gender: initialGender,
    name,
    price,
    material,
    shape,
    quantity,
  } = singleProduct?.data || {};

  const [color, setColor] = useState(initialColor || 'red');
  const [gender, setGender] = useState(initialGender || 'male');
const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultValues = {
    price,
    quantity,
    color,
    gender,
    name,
    shape,
    material,
  };

  const showModal = () => {
    refetch();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {};
  const handleDuplicate: SubmitHandler<FieldValues> = async (data) => {
    const sendData = {
      user: user!.email,
      image: product.image,
      id,
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      color,
      gender,
    };
    await asyncHandler({
      res: duplicateProduct(sendData).unwrap(),
      toastText: 'duplicate product',
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>
        {isLoading ? (
          <SyncOutlined className='text-blue-500' spin />
        ) : (
          <CopyTwoTone />
        )}
      </button>
      <Modal
        okButtonProps={{ className: 'hidden' }}
        title='Duplicate Product'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key='back'
            disabled={isLoading || duplicateLoading}
            onClick={handleCancel}
          >
            cancel
          </Button>,
        ]}
      >
        <EGForm onSubmit={handleDuplicate} defaultValues={defaultValues}>
          <Input
            title='name'
            type='text'
            require
            label='Enter Your Product Name'
          />
          <SelectFrameShape />
          <EGLabel title='Select Brand' />
          <SelectBrands brands={brands} brand='' />
          <SelectionOptions
            defaultValue='metal'
            name='material'
            item={['metal', 'plastic']}
            label='Enter Frame Metal'
          />

          {/* gender */}
          <div className='my-2'>
            <EGLabel title='Select Gender' />
            <div className='flex gap-5'>
              <div className='flex gap-2 items-center'>
                <input
                  checked={gender === 'male'}
                  value={'male'}
                  type='radio'
                  onClick={() => setGender('male')}
                />

                <EGLabel title='Male' />
              </div>
              <div className='flex gap-2 items-center'>
                <input
                  checked={gender === 'female'}
                  value={'female'}
                  type='radio'
                  onClick={() => setGender('female')}
                />
                <EGLabel title='Female' />
              </div>
            </div>
          </div>
          {/* quantity */}
          <Input
            title='quantity'
            label='Enter Your Quantity'
            require
            type='number'
          />
          {/* lense */}
          <div>
            <SelectionOptions
              defaultValue={product.lenseType}
              name='lenseType'
              item={lenseType}
              label='Enter Type of Lense'
            />
          </div>
          {/* price */}
          <Input title='price' label='Enter Your Price' require type='number' />
          {/* color */}
          <SelectColor color={color} setColor={setColor} />
          <button
            disabled={isLoading || duplicateLoading}
            className=' absolute bottom-[3%] -mt-8 text-gray-500 border border-gray-400 hover:text-green-400 hover:border-green-400 duration-500 px-3 py-1 rounded-lg'
            type='submit'
          >
            {isLoading || duplicateLoading ? (
              <SyncOutlined className='text-blue-500' spin />
            ) : (
              'Duplicate'
            )}
          </button>
        </EGForm>
      </Modal>
    </>
  );
}
