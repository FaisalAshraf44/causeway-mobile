/* Login Reducer
 * handles login states in the app
 */
import { createSlice } from '@reduxjs/toolkit';

import { LoginState } from 'app/models/reducers/login';
const initialState: LoginState = {
  isLoggedIn: false,
  id: 0,
  username: '',
  password: '',
  firstRun: true,
};

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogin: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload,
      };
    },
    logOut: () => {
      return initialState;
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

export const { onLogin, logOut, completeFirstRun } = loginSlice.actions;
export default loginSlice.reducer;
