/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from 'antd';
import { ReactNode, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { lenseType } from '../../constant/addProduct.constant';
import { useBrandsQuery } from '../../redux/features/brand/brandApi';
import { useUpdateProductMutation } from '../../redux/features/product/productApi';
import { TError } from '../../types';
import Input from '../AddProduct/Input';
import SelectBrands from '../AddProduct/SelectBrands';
import SelectColor from '../AddProduct/SelectColor';
import SelectFrameShape from '../AddProduct/SelectFrameShape';
import SelectionOptions from '../AddProduct/SelectionOptions';
import EGForm from '../form/EGForm';
import EGLabel from '../form/EGLabel';

interface TUpdateProduct {
  children: ReactNode;
  product: any;
  id: string;
}
export function UpdateModal({ children, product, id }: TUpdateProduct) {
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const { data: brands, isLoading } = useBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [color, setColor] = useState(product?.color || 'red');
  const [gender, setGender] = useState(product.gender || 'male');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, price, material, shape, quantity } = product || {};
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
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {};
  const handleUpdate: SubmitHandler<FieldValues> = async (data) => {
    const sendData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      color,
      gender,
    };
    const updateTostId = toast.loading('Trying to Update Product', {
      duration: 2000,
    });
    try {
      const updateData = await updateProduct({ id, sendData }).unwrap();
      toast.success(`${updateData?.message}`, {
        id: updateTostId,
        duration: 2000,
      });
      setIsModalOpen(false);
    } catch (error: TError | any) {
      toast.error(`${error?.message}`, { id: updateTostId, duration: 2000 });
    }
  };

  return (
    <>
      <button onClick={showModal}>{children}</button>
      <Modal
        okButtonProps={{ className: 'hidden' }}
        title='Update Product'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key='back'
            disabled={isLoading || updateLoading}
            onClick={handleCancel}
          >
            cancel
          </Button>,
        ]}
      >
        <EGForm onSubmit={handleUpdate} defaultValues={defaultValues}>
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
          {/* lense */}
          <div>
            <SelectionOptions
              defaultValue={product?.lenseType}
              name='lenseType'
              item={lenseType}
              label='Enter Type of Lense'
            />
          </div>
          {/* price */}
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

          {/* price */}
          <Input title='price' label='Enter Your Price' require type='number' />
          {/* color */}
          <SelectColor color={color} setColor={setColor} />
          <button
            disabled={isLoading || updateLoading}
            className=' absolute bottom-[3%] -mt-8 text-gray-500 border border-gray-400 hover:text-green-400 hover:border-green-400 duration-500 px-3 py-1 rounded-lg'
            type='submit'
          >
            Update
          </button>
        </EGForm>
      </Modal>
    </>
  );
}
