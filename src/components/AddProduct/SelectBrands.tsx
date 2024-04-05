import { Controller } from 'react-hook-form';

export default function SelectBrands({
  brands,
  brand,
}: {
  brand?: string;
  brands: { data: { _id: string; brand: string }[] };
}) {
  return (
    <Controller
      defaultValue={brand || (brands && brands.data[0]._id)}
      name='brand'
      render={({ field }) => (
        <select className='input' {...field}>
          {brands?.data?.map(
            (el: { _id: string; brand: string }, i: number) => (
              <option key={i} value={el?._id}>
                {el?.brand}
              </option>
            )
          )}
        </select>
      )}
    />
  );
}
