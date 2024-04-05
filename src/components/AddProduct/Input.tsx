import { Controller } from 'react-hook-form';

export default function Input({
  title,
  type,
  require,
  label,
  defaultValue
}: {
  title: string;
  type?: string;
  require?: boolean;
  label?: string;
  defaultValue?: string;
}) {
  return (
    <div className='my-2'>
      {label && (
        <label
          htmlFor={title}
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          {label}
        </label>
      )}
      <Controller
        name={title}
        render={({ field }) => (
          <input
          defaultValue={defaultValue}
            min={0}
            {...field}
            type={type || 'text'}
            name={title}
            id={title}
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder={title}
            required={require}
          />
        )}
      />
    </div>
  );
}
