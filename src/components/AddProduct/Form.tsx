/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'antd';
import { useState } from 'react';
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { lenseType, material } from '../../constant/addProduct.constant';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useBrandsQuery } from '../../redux/features/brand/brandApi';
import { useAddProductMutation } from '../../redux/features/product/productApi';
import { useAppSelector } from '../../redux/hooks';
import { TError } from '../../types';
import EGForm from '../form/EGForm';
import EGLabel from '../form/EGLabel';
import EGLoading, { EGLoadElement } from '../ui/EGLoading';
import Input from './Input';
import SelectBrands from './SelectBrands';
import SelectColor from './SelectColor';
import SelectFrameShape from './SelectFrameShape';
import SelectionOptions from './SelectionOptions';
export default function Form({ loading }: { loading?: boolean }) {
  const user = useAppSelector(selectCurrentUser);

  const navigate = useNavigate();
  const [addProduct, { isLoading: postLoad }] = useAddProductMutation();
  const [gender, setGender] = useState('male');
  const [color, setColor] = useState('red');
  const {
    data: brands,
    isLoading,
    error,
    refetch,
  } = useBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const handleAddProduct: SubmitHandler<FieldValues> = async (data) => {
    const { price, quantity, image, ...remainingData } = data;

    const sendData = {
      ...remainingData,
      color,
      gender,
      user: user!.email,
      price: Number(price),
      quantity: Number(quantity),
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(sendData));
    formData.append('file', image);
    const addStatusId = toast.loading('wait trying to add product');
    try {
      const sendProduct = await addProduct(formData).unwrap();
      toast.success(`${sendProduct?.message}`, {
        duration: 2000,
        id: addStatusId,
      });
      if (sendProduct?.success) {
        navigate(`/${user?.role}/all-products`);
      }
    } catch (error: any | TError) {
      toast.error(
        `${error?.data?.message} ${error?.data?.errorSources[0]?.message}`,
        { duration: 2000, id: addStatusId }
      );
    }
  };
  if (loading) {
    refetch();
  }

  let content = null;
  if (isLoading && !error) {
    content = <EGLoading />;
  }
  if (!isLoading && !error && brands?.data?.length > 0) {
    content = (
      <EGForm onSubmit={handleAddProduct}>
        <Input title='name' type='text' label='Enter Your Product Name' />
        <SelectFrameShape />
        <div className='my-2'>
          <EGLabel title='Select Brand' />
          {loading ? <EGLoadElement /> : <SelectBrands brands={brands} />}
        </div>
        <div>
          <SelectionOptions
            defaultValue='metal'
            name='material'
            item={material}
            label='Enter Frame Metal'
          />
        </div>
        <div>
          <SelectionOptions
            defaultValue='polarized'
            name='lenseType'
            item={lenseType}
            label='Enter Type of Lense'
          />
        </div>
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
        <Input
          title='quantity'
          label='Enter Your Quantity'
          require
          type='number'
        />
        <Input title='price' label='Enter Your Price' require type='number' />
        <SelectColor color={color} setColor={setColor} />
        <div className='my-2'>
          <EGLabel title='Upload file' />
          <Controller
            name='image'
            render={({ field }) => (
              <input
                onChange={(e) => field.onChange(e.target.files![0])}
                className='block w-full text-sm p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 '
                type='file'
                accept='image/png, image/gif, image/jpeg, image/jpeg'
              />
            )}
          />
          <p className='mt-1 text-xs text-gray-500 '>SVG, PNG, JPG or GIF </p>
        </div>
        <Button htmlType='submit' disabled={isLoading && postLoad}>
          Add Product
        </Button>
      </EGForm>
    );
  }

  return <>{content}</>;
}
