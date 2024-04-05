import { createSlice } from '@reduxjs/toolkit';
const initialState: string[] = [];
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    deletedId: (state: string[], action) => {
      const index = state.indexOf(action.payload);

      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(action.payload);
      }
    },
    bulkSelect: (state: string[], action) => {
      if (state.length > 0) {
        return initialState;
      } else {
        return [...action.payload];
      }
    },
  },
});
export const { deletedId, bulkSelect } = productSlice.actions;
export default productSlice.reducer;
