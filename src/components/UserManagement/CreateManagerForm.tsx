/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyncOutlined } from '@ant-design/icons';
import { FieldValues } from 'react-hook-form';
import { useCreateManagerMutation } from '../../redux/features/user/userApi';
import asyncHandler from '../../utils/asyncHandler';
import EGForm from '../form/EGForm';
import EGInput from '../form/EGInput';
import EGSelect from '../form/EGSelect';

export default function CreateManagerForm() {
  const [createManager, { isLoading }] = useCreateManagerMutation();
  const handleCreateManager = async (data: FieldValues) => {
    console.log(data);
    asyncHandler({
      toastText: 'Create Manager',
      res: createManager(data).unwrap(),
    });
  };
  return (
    <div className='border px-8 rounded-lg'>
      <EGForm onSubmit={handleCreateManager}>
        <h2 className='text-2xl font-bold text my-4  text-[var(--head-text)]'>
          Create Manager
        </h2>
        <div className='grid md:grid-cols-2 gap-2'>
          <EGInput
            name='name.firstName'
            type='text'
            placeholder='Enter First Name'
            required
          />
          <EGInput
            name='name.lastName'
            type='text'
            placeholder='Enter Last Name'
            required
          />
        </div>
        <div className='grid md:grid-cols-2 gap-2'>
          <EGInput
            name='username'
            type='text'
            placeholder='Enter Username'
            required
          />

          <EGInput
            name='email'
            type='Email'
            placeholder='Enter Email'
            required
          />
        </div>

        <div className='grid md:grid-cols-2 gap-2'>
          <EGInput
            name='contact'
            type='text'
            placeholder='Enter Phone Number'
            required
          />
          <EGInput
            name='address.country'
            type='text'
            placeholder='Enter Country'
          />
          <EGInput name='address.city' type='text' placeholder='Enter City' />
          <EGInput
            name='address.zipCode'
            type='text'
            placeholder='Enter Zip Code'
          />
        </div>
        <EGInput
          name='address.detailsAddress'
          type='text'
          placeholder='Enter Address in Details'
        />
        <EGSelect
          options={['male', 'female']}
          defaultValue='male'
          name='gender'
        />
        <div className='mt-5'>
          <EGInput
            name='password'
            type='password'
            placeholder='Enter Password'
          />
        </div>
        <div className='flex justify-between items-center '>
          <button
            disabled={isLoading}
            className='px-3 py-1 rounded-md hover:bg-slate-600 duration-150 bg-gray-700 text-white'
          >
            {isLoading ? (
              <>
                <span className='pr-1'>Create Manager</span>
                <SyncOutlined className='text-white' spin />
              </>
            ) : (
              'Create Manager'
            )}
          </button>
        </div>
      </EGForm>
    </div>
  );
}
