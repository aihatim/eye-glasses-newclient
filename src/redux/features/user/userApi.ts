/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createManager: builder.mutation({
      query: (managerInfo) => ({
        url: '/users/create-manager',
        method: 'POST',
        body: managerInfo,
      }),
      // invalidatesTags: (result, _error, args) => {
      //   if (result) {
      //     return [
      //       { type: 'Products', id: args.id },
      //       { type: 'SellProducts', id: args.id },
      //     ];
      //   } else {
      //     return [
      //       { type: 'Products', id: 'ProductList' },
      //       { type: 'SellProducts', id: 'SellProductList' },
      //     ];
      //   }
      // },
    }),
    getAllManagers: builder.query({
      query: (query: Record<string, unknown>) => ({
        url: `/managers`,
        method: 'GET',
        params: query,
      }),
    }),
    createNormalUser: builder.mutation({
      query: (userInfo) => ({
        url: '/users/sellers',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getAllUsers: builder.query({
      query: (query: Record<string, unknown>) => ({
        url: `/sellers`,
        method: 'GET',
        params: query,
      }),
    }),
  }),
});

export const {
  useCreateManagerMutation,
  useGetAllManagersQuery,
  useCreateNormalUserMutation,
  useGetAllUsersQuery,
} = userApi;
