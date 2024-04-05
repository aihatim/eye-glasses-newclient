/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';
import Form from '../../../components/AddProduct/Form';
import Input from '../../../components/AddProduct/Input';
import EGForm from '../../../components/form/EGForm';
import EGTitle from '../../../components/ui/EGTitle';
import { useAddBrandMutation } from '../../../redux/features/brand/brandApi';
import { TError } from '../../../types';

export default function AddProduct() {
  const [addBrand, { isLoading }] = useAddBrandMutation();
  const handleBrand = async (data: any) => {
    const addBrandToast = toast.loading('Wait trying to add Brand');
    try {
      const brand = await addBrand(data).unwrap();
      toast.success(`${brand?.message}`, {
        duration: 2000,
        id: addBrandToast,
      });
    } catch (error: TError | any) {
      toast.error(
        `${error?.data?.message} ${error?.data?.errorSources[0]?.message}`,
        { duration: 2000, id: addBrandToast }
      );
    }
  };

  return (
    <>
      <EGTitle>Add Brand</EGTitle>
      <div className='mb-5'>
        <EGForm onSubmit={handleBrand} >
          <Input title='brand' require label='Enter your Brand Name' />
          <button
            disabled={isLoading}
            className='my-2 bg-gray-700 disabled:bg-gray-400 hover:bg-gray-600 duration-300 px-2 py-1 rounded-md text-white'
          >
            Add Brand
          </button>
        </EGForm>
      </div>
      <EGTitle>Add Product</EGTitle>
      <Form loading={isLoading} />
    </>
  );
}
