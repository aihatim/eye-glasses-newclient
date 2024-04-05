import { Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

const EGInput = ({ type, name, label, placeholder, required }: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }} className='relative'>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            required={required}
            {...field}
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type={type}
            id={name}
            placeholder={placeholder}
          />
        )}
      />
      {required && (
        <span className='font-extrabold text-xl text-red-400 absolute right-3 top-2'>
          *
        </span>
      )}
    </div>
  );
};

export default EGInput;
