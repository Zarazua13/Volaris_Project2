import { createSlice } from '@reduxjs/toolkit';

import { Location } from '@/interfaces';

interface GetLocations {
  loading: boolean,
  success: boolean,
  error: any,
  data: Location[],
}

interface InitialState {
  getLocations: GetLocations
}

const initialState: InitialState = {
  getLocations: {
    loading: false,
    success: false,
    data: [],
    error: null,
  },
}

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    getLocationsLoading: state => {
      state.getLocations.loading = true
    },
    getLocationsSuccess: (state, action) => {
      state.getLocations.loading = false
      state.getLocations.success = true
      state.getLocations.data = action.payload
      state.getLocations.error = null
    },
  }
});

export const { getLocationsLoading, getLocationsSuccess } = locationsSlice.actions;