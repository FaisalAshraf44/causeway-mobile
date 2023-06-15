/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import { LoadingState } from 'app/models/reducers/loading';
import { createSlice } from '@reduxjs/toolkit';
const initialState: LoadingState = {
  loading: false,
  user: undefined,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    enableLoader: (state: LoadingState) => {
      return {
        ...state,
        loading: true,
      };
    },
    disableLoader: (state: LoadingState) => {
      return {
        ...state,
        loading: true,
      };
    },
    onTempLogin: (state: LoadingState, action: any) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    onTempLogout: (state: LoadingState) => {
      return {
        ...state,
        user: undefined,
      };
    },
  },
});

export const { enableLoader, disableLoader, onTempLogin, onTempLogout } =
  loadingSlice.actions;
export default loadingSlice.reducer;
