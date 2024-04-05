import { baseApi } from '../../api/baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => {
        return {
          url: '/products/add-product',
          method: 'POST',
          body: productInfo,
        };
      },
      invalidatesTags: () => {
        return [{ type: 'Products', id: 'ProductList' }];
      },
    }),
    getAllProducts: builder.query({
      query: (filterQuery) => {
        const query = Object?.entries(filterQuery || {})
          ?.map((el) => `${el[0]}=${el[1]}`)
          .join('&');

        return {
          url: `/products?${query}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result
          ? result?.data.map((product: Record<string, unknown>) => ({
              type: 'Products',
              id: product.id,
            }))
          : [{ type: 'Products', id: 'ProductList' }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, _error, args) =>
        result
          ? [
              { type: 'Products', id: args },
              { type: 'Inventory', id: result._id },
              { type: 'Duplicate', id: 'DuplicateList' },
            ]
          : [
              { type: 'Products', id: 'ProductList' },
              { type: 'Inventory', id: 'InventoryList' },
              { type: 'Duplicate', id: 'DuplicateList' },
            ],
    }),
    updateProduct: builder.mutation({
      query: ({ id, sendData }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: sendData,
      }),
      invalidatesTags: (result, _error, args) =>
        result
          ? [
              { type: 'Products', id: args.id },
              { type: 'Inventory', id: result._id },
              { type: 'Duplicate', id: 'DuplicateList' },
            ]
          : [
              { type: 'Products', id: 'ProductList' },
              { type: 'Inventory', id: 'InventoryList' },
              { type: 'Duplicate', id: 'DuplicateList' },
            ],
    }),
    bulkProductDelete: builder.mutation({
      query: (deletedData) => ({
        url: `/products/bulk`,
        method: 'PATCH',
        body: deletedData,
      }),
      invalidatesTags: (result, _error, args) =>
        result
          ? args.map((el: string) => ({ type: 'Products', id: el }), {
              type: 'Inventory',
              id: args.id,
            })
          : [{ type: 'Products', id: 'ProductList' }],
    }),
    duplicateProduct: builder.mutation({
      query: (productInfo) => ({
        url: `/products/duplicate-product`,
        method: 'POST',
        body: productInfo,
      }),
      invalidatesTags: (result, _error, args) => {
        return result
          ? [
              { type: 'Products', id: args.id },
              { type: 'Inventory', id: result?.data?._id },
              { type: 'Duplicate', id: 'DuplicateList' },
            ]
          : [
              { type: 'Products', id: 'ProductList' },
              { type: 'Inventory', id: 'InventoryList' },
              { type: 'Duplicate', id: 'DuplicateList' },
            ];
      },
    }),
    getSingleProduct: builder.query({
      query: (id) => ({ url: `/products/${id}`, method: 'GET' }),
      providesTags: [{ type: 'Duplicate', id: 'DuplicateList' }],
    }),

    getSellerInventory: builder.query({
      query: (filterQuery) => {
        const query = Object?.entries(filterQuery || {})
          ?.map((el) => `${el[0]}=${el[1]}`)
          .join('&');

        return {
          url: `/products/seller-products?${query}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result
          ? result?.data.map((product: Record<string, unknown>) => ({
              type: 'Inventory',
              id: product._id,
            }))
          : [{ type: 'Inventory', id: 'InventoryList' }],
    }),
  }),
});
export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useBulkProductDeleteMutation,
  useDuplicateProductMutation,
  useGetSellerInventoryQuery,
  useGetSingleProductQuery,
} = productApi;
