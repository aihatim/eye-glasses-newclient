import { Controller } from 'react-hook-form';
import { shape } from '../../constant/addProduct.constant';
export default function SelectFrameShape({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <div className='capitalize'>
      <label className='block mb-2 text-sm font-medium text-gray-900'>
        Select Frame shape
      </label>
      <Controller
        defaultValue={defaultValue || 'rectangle'}
        name='shape'
        render={({ field }) => (
          <select className='input capitalize' {...field}>
            {shape.map((el, i) => (
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
