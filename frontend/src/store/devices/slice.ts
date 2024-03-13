import { createSlice } from '@reduxjs/toolkit';

import { Device } from '@/interfaces';

interface GetDevices {
  loading: boolean,
  success: boolean,
  error: any,
  data: Device[],
}

interface InitialState {
  getDevices: GetDevices
}

const initialState: InitialState = {
  getDevices: {
    loading: false,
    success: false,
    data: [],
    error: null,
  },
}

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    getDevicesLoading: state => {
      state.getDevices = {
        ...initialState.getDevices,
        loading: true
      }
    },
    getDevicesSuccess: (state, action) => {
      state.getDevices = {
        ...initialState.getDevices,
        success: true,
        data: action.payload
      }
    },
    getDevicesError: (state, action) => {
      state.getDevices = {
        ...initialState.getDevices,
        error: action.payload
      }
    },
  }
});

export const { 
  getDevicesLoading, 
  getDevicesSuccess, 
  getDevicesError 
} = devicesSlice.actions;