/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../../api/baseApi';

const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSell: builder.mutation({
      query: ({ sellInfo }) => ({
        url: '/sells/create-sell',
        method: 'POST',
        body: sellInfo,
      }),
      invalidatesTags: (result, _error, args) => {
        if (result) {
          return [
            { type: 'Products', id: args.id },
            { type: 'SellProducts', id: args.id },
          ];
        } else {
          return [
            { type: 'Products', id: 'ProductList' },
            { type: 'SellProducts', id: 'SellProductList' },
          ];
        }
      },
    }),
    getSells: builder.query({
      query: (query: string) => ({
        url: `/sells?byDate=${query}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? result?.data.map((el: any) => ({
              type: 'SellProducts',
              id: el?.productId?.id,
            }))
          : [{ type: 'SellProducts', id: 'SellProductList' }],
    }),
    getInvoice: builder.query({
      query: (id: string) => ({
        url: `/sells/invoice/${id}`,
        method: 'GET',
      }),
    }),
    getSellerHistory: builder.query({
      query: (filter) => ({
        url: `/sells/seller-history`,
        method: 'GET',
        params: filter,
      }),
    }),
  }),
});

export const {
  useCreateSellMutation,
  useGetSellsQuery,
  useGetInvoiceQuery,
  useGetSellerHistoryQuery,
} = sellApi;
