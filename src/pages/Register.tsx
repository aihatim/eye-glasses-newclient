/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from 'antd';
import { FieldValues } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import EGForm from '../components/form/EGForm';
import EGInput from '../components/form/EGInput';
import EGSelect from '../components/form/EGSelect';
import { useRegisterMutation } from '../redux/features/auth/authApi';
import { TError } from '../types';

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const handleRegister = async (data: FieldValues) => {
    const { zipCode, city, country, firstName, lastName, ...remainingData } =
      data;
    const signUpInfo = {
      name: { firstName, lastName },
      address: { country, city, zipCode },
      ...remainingData,
    };
    const registerToast = toast.loading('Trying to register ', {
      duration: 2000,
    });
    try {
      const registerUser = await register(signUpInfo).unwrap();
      toast.success(`${registerUser.message}`, {
        id: registerToast,
        duration: 2000,
      });
      navigate('/login');
    } catch (error: TError | any) {
      toast.error(
        `${error?.data?.errorSources[0]?.message || error?.data?.message}`,
        {
          id: registerToast,
          duration: 2000,
        }
      );
    }
  };

  return (
    <div className=' bg-[#c8bfe5] w-full'>
      <div className='max-w-md mx-auto grid items-center min-h-screen'>
        <div className='border px-8 rounded-lg'>
          <EGForm onSubmit={handleRegister}>
            <h2 className='text-2xl font-bold text my-4 text-center text-gray-700'>
              Sign Up
            </h2>
            <div className='grid grid-cols-2 gap-2'>
              <EGInput
                name='firstName'
                type='text'
                placeholder='Enter First Name'
                required
              />
              <EGInput
                name='lastName'
                type='text'
                placeholder='Enter Last Name'
                required
              />
            </div>
            <EGInput
              name='username'
              type='text'
              placeholder='Enter Username'
              required
            />
            <EGInput name='email' type='Email' placeholder='Enter Email' />
            <EGInput
              name='password'
              type='password'
              placeholder='Enter Password'
              required
            />

            <div className='grid grid-cols-2 gap-2'>
              <EGInput
                name='contact'
                type='text'
                placeholder='Enter Phone Number'
                required
              />
              <EGInput name='country' type='text' placeholder='Enter Country' />
              <EGInput name='city' type='text' placeholder='Enter City' />
              <EGInput
                name='zipCode'
                type='text'
                placeholder='Enter Zip Code'
              />
            </div>
            <EGInput
              name='detailsAddress'
              type='text'
              placeholder='Enter Address in Details'
            />
            <EGSelect
              options={['male', 'female']}
              defaultValue='male'
              name='gender'
            />
            <div className='flex justify-between items-center '>
              <button
                disabled={isLoading}
                className='px-3 py-1 rounded-md my-5 hover:bg-slate-600 duration-150 bg-gray-700 text-white'
              >
                {isLoading ? <Spin /> : 'Register'}
              </button>
              <Link
                to='/login'
                className='capitalize underline text-xs text-gray-500 hover:text-blue-500 duration-200'
              >
                already have an account?
              </Link>
            </div>
          </EGForm>
        </div>
      </div>
    </div>
  );
};

export default Register;
