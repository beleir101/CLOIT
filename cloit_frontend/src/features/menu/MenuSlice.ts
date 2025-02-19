import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMenus, addMenu, updateMenu, deleteMenu } from './MenuApi';

export const getMenus = createAsyncThunk('menu/getMenus', async () => {
  const response = await fetchMenus();
  return response.data;
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: { menus: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMenus.fulfilled, (state, action) => {
      state.menus = action.payload;
    });
  },
});

export default menuSlice.reducer;