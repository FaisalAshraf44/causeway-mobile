/* Login Reducer
 * handles login states in the app
 */
import { createSlice } from '@reduxjs/toolkit';

import { LoginState } from 'app/models/reducers/login';
const initialState: LoginState = {
  user: undefined,
  firstRun: true,
};

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogin: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    onLogout: (state) => {
      return {
        ...state,
        user: undefined,
      };
    },

    //imp
    completeFirstRun: (state) => {
      return {
        ...state,
        firstRun: false,
      };
    },
  },
});

export const { onLogin, completeFirstRun, onLogout } = loginSlice.actions;
export default loginSlice.reducer;
