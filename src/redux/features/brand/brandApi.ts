import { baseApi } from '../../api/baseApi';

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    brands: builder.query({ query: () => ({ url: '/brands', method: 'GET' }) }),
    getSingleBrands: builder.query({
      query: (id) => ({ url: `/brands/${id}`, method: 'GET' }),
      providesTags: (result) =>
        result
          ? result?.data?.map((el: { _id: string }) => ({
              type: 'Brands',
              id: el._id,
            }))
          : [{ type: 'Brands', id: 'BrandsList' }],
    }),
    addBrand: builder.mutation({
      query: (brand: { brand: string }) => ({
        url: '/brands/add-brand',
        method: 'POST',
        body: brand,
      }),
      invalidatesTags: () => {
        return [{ type: 'Brands', id: 'BrandsList' }];
      },
    }),
  }),
});
export const { useBrandsQuery, useGetSingleBrandsQuery,useAddBrandMutation } = brandApi;
