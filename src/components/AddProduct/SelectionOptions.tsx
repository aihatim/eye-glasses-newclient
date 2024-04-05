import { Controller } from 'react-hook-form';
import { TSelectOptions } from '../../types/addProduct.types';

export default function SelectionOptions({
  item,
  name,
  defaultValue,
  label,
}: TSelectOptions) {
  return (
    <div className='capitalize'>
      {label && (
        <label className='block mb-2 text-sm font-medium text-gray-900'>
          {label}
        </label>
      )}
      <Controller
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => (
          <select className='input capitalize' {...field}>
            {item?.map((el, i) => (
              <option key={i} className='capitalize'>
                {el}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
}
