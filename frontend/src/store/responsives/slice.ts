import { Responsive } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface GetResponsives {
  loading: boolean,
  success: boolean,
  data: Responsive[],
  error: any
}


interface InitialState {
  getResponsives: GetResponsives,
}

const initialState: InitialState = {
  getResponsives: {
    loading: false,
    success: false,
    data: [],
    error: null,
  },
}

export const responsivesSlice = createSlice({
  name: 'responsives',
  initialState,
  reducers: {
    getResponsivesLoading: (state) => {
      state.getResponsives = {
        ...initialState.getResponsives,
        loading: true
      }
    },
    getResponsivesSuccess: (state, { payload }) => {
      state.getResponsives = {
        ...initialState.getResponsives,
        success: true,
        data: payload
      }
    },
    getResponsivesError: (state, { payload }) => {
      state.getResponsives = {
        ...initialState.getResponsives,
        error: payload
      }
    },
  }
});

export const { getResponsivesLoading, getResponsivesSuccess, getResponsivesError } = responsivesSlice.actions;