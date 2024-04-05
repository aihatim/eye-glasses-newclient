import { Controller } from 'react-hook-form';

interface TSelect {
  options: string[];
  defaultValue: string;
  name: string;
}

export default function EGSelect({ options, defaultValue, name }: TSelect) {
  return (
    <div className='capitalize'>
      <Controller
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => (
          <select className='input capitalize' {...field}>
            {options?.map((el, i) => (
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
