// redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // adjust the path if your store file is elsewhere

// Define user type
interface User {
  firstName: string;
  lastName: string;
  username?: string;
  [key: string]: unknown; // allows extra fields if needed
}

// Define state type
interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const user = { ...action.payload };
      state.user = {
        ...user,
        username: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`,
      };
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  },
});

// Exporting actions
export const { setUser, setToken, logout } = userSlice.actions;

// Selector
export const selectUser = (state: RootState) => state?.user?.user;

// Exporting reducer
export default userSlice.reducer;
