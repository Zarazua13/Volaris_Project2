import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'name',
  initialState: {
    status: 'CHECKING', // 'NOT-AUTHENTICATED', 'AUTHENTICATED'
    id: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login() {

    },
    logout() {

    },
    checkingCredentials() {

    }
  }
});

export const { login, logout } = authSlice.actions;
