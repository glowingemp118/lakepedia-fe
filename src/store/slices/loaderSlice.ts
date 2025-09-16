// src/slices/loaderSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// Define the state type
interface LoaderState {
  loading: boolean;
}

// Initial state with type safety
const initialState: LoaderState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
});

// Export actions
export const { showLoader, hideLoader } = loaderSlice.actions;

// Export reducer
export default loaderSlice.reducer;
