/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyncOutlined } from '@ant-design/icons';
import { FieldValues } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import EGForm from '../components/form/EGForm';
import EGInput from '../components/form/EGInput';
import { useLoginMutation } from '../redux/features/auth/authApi';
import {
  TUser,
  selectCurrentUser,
  setUser,
  useCurrentToken,
} from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { TError } from '../types';
import { verifyToken } from '../utils/verifyToken';

const Login = () => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = { emailOrUser: 'devid_smith', password: 'Devid120#' };

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const userInfo = {
      emailOrUser: data.emailOrUser,
      password: data.password,
    };
    const toastId = toast.loading('Logging in');
    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate(`/${user.role}/all-products`);
    } catch (error: TError | any) {
      toast.error(
        `${
          error?.data?.errorSources.length > 0
            ? error?.data?.errorSources[0]?.message
            : error?.data?.message
        }`,
        { id: toastId, duration: 2000 }
      );
    }
  };
  let content = null;
  if (token) {
    content = <Navigate to={`/${user?.role}/all-products`} replace />;
  }
  if (!token) {
    content = (
      <div className=' bg-[#c8bfe5] w-full'>
        <div className='max-w-md mx-auto grid items-center min-h-screen'>
          <div className='border px-8 rounded-lg '>
            <EGForm onSubmit={onSubmit} defaultValues={defaultValues}>
              <h2 className='text-2xl font-bold text my-4 text-center text-gray-700'>
                Login
              </h2>
              <EGInput
                required
                type='text'
                name='emailOrUser'
                placeholder='Enter Your Email Or Username'
              />
              <EGInput
                required
                type='password'
                name='password'
                placeholder='Enter your password'
              />
              <div className='flex justify-between items-center '>
                <button
                  disabled={isLoading}
                  className='px-3 py-1 rounded-md my-5 hover:bg-slate-600 duration-150 bg-gray-700 text-white'
                >
                  {isLoading ? (
                    <>
                      <span className='pr-1'>Login</span>
                      <SyncOutlined className='text-white' spin />
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
                <Link
                  to='/register'
                  className='capitalize underline text-xs text-white hover:text-blue-500 duration-200'
                >
                  New to Eye glass? Please Register!
                </Link>
              </div>
            </EGForm>
          </div>
          <div>
            <p className='font-bold text-xl'>Demo Account</p>
            <div>
              <p className='font-bold'>Admin</p>
              <p>username: devid_smith</p>
              <p>password: Devid120#</p>
            </div>
            <div>
              <p className='font-bold'>Manager</p>
              <p>username: manager120</p>
              <p>password: Manager120#</p>
            </div>
            <div>
              <p className='font-bold'>User</p>
              <p>username: normaluser</p>
              <p>password: User120#</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default Login;
