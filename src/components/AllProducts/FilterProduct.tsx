import { Tooltip } from 'antd';
import { useState } from 'react';
import { color, lenseType, shape } from '../../constant/addProduct.constant';
import { TFilter } from '../../constant/filter.types';
import { useBrandsQuery } from '../../redux/features/brand/brandApi';
import BulkDeleteButton from './BulkDeleteButton';

const initialData = {
  material: '',
  gender: '',
  priceRange: 0,
  lenseType: '',
  color: '',
  brand: '',
  shape: '',
  search: '',
};

export default function FilterProduct({
  setFilterQuery,
}: {
  setFilterQuery: (e: object) => void;
}) {
  const {
    data: allBrands,
    isLoading,
    isError,
  } = useBrandsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [query, setQuery] = useState<TFilter>(initialData);

  return (
    <>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='size-3 text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          onChange={(e) => setQuery({ ...query, search: e.target.value })}
          value={query.search}
          type='search'
          id='default-search'
          className='block  outline-none w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50'
          placeholder='Search Here That Your want'
          required
        />
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-5'>
        <select
          value={query.material}
          name=''
          id=''
          className='input capitalize'
          onChange={(e) => setQuery({ ...query, material: e.target.value })}
        >
          <option value=''>Material</option>
          <option value='metal'>metal</option>
          <option value='plastic'>Plastic</option>
        </select>

        {allBrands && !isLoading && !isError && (
          <select
            value={query.brand}
            name=''
            id=''
            className='input capitalize'
            onChange={(e) => setQuery({ ...query, brand: e.target.value })}
          >
            <option value=''>Brands</option>
            {allBrands?.data?.map((b: { _id: string; brand: string }) => (
              <option value={b._id} key={b._id} className='capitalize'>
                {b.brand}
              </option>
            ))}
          </select>
        )}

        <select
          name=''
          value={query.shape}
          id=''
          className='input capitalize'
          onChange={(e) => setQuery({ ...query, shape: e.target.value })}
        >
          <option value=''>Shapes</option>
          {shape?.map((shape: string) => (
            <option value={shape} key={shape} className='capitalize'>
              {shape}
            </option>
          ))}
        </select>
        <select
          value={query.color}
          name=''
          id=''
          className='input capitalize'
          onChange={(e) => setQuery({ ...query, color: e.target.value })}
        >
          <option value=''>Colors</option>
          {color?.map((color: string) => (
            <option value={color} key={color} className='capitalize'>
              {color}
            </option>
          ))}
        </select>
        <select
          value={query.lenseType}
          name=''
          id=''
          className='input capitalize'
          onChange={(e) => setQuery({ ...query, lenseType: e.target.value })}
        >
          <option value=''>Lenses</option>
          {lenseType?.map((lense: string) => (
            <option value={lense} key={lense} className='capitalize'>
              {lense}
            </option>
          ))}
        </select>
        <select
          value={query.gender}
          name=''
          id=''
          className='input capitalize'
          onChange={(e) => setQuery({ ...query, gender: e.target.value })}
        >
          <option value=''>Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        <div className='relative mb-6 md:col-span-2'>
          <label htmlFor='labels-range-input' className='sr-only'>
            Labels range
          </label>
          <Tooltip title={query?.priceRange} color='#6f4ab4'>
            <input
              onChange={(e) =>
                setQuery({ ...query, priceRange: Number(e.target.value) })
              }
              value={query.priceRange}
              id='labels-range-input'
              type='range'
              min='20'
              max='500'
              className='w-full h-2 bg-[--base-color] rounded-lg appearance-none cursor-pointer'
            />
          </Tooltip>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <button
            className='px-3 py-1 rounded-md my-5 hover:bg-slate-600 duration-150 bg-gray-700 text-white'
            onClick={() => setFilterQuery(query)}
          >
            Submit
          </button>
          <button
            className='px-3 py-1 rounded-md my-5 hover:bg-purple-400 duration-150  bg-[--base-color] text-white'
            onClick={() => {
              setQuery(initialData);
              setFilterQuery({});
            }}
          >
            Clear Filter
          </button>
        </div>
        <BulkDeleteButton />
      </div>
    </>
  );
}
