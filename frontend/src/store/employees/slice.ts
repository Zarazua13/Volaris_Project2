import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getEmployees: {
    loading: false,
    loaded: false,
    data: [],
    error: null,
  },
  getEmployee: {
    loading: false,
    loaded: false,
    data: [],
    error: null,
  }
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    getEmployeesLoading: (state) => {
      state.getEmployees = {
        ...initialState.getEmployees,
        loading: true
      }
    },
    getEmployeesSuccess: (state, action) => {
      state.getEmployees = {
        ...initialState.getEmployees,
        loaded: true,
        data: action.payload
      }
    },
    getEmployeesError: (state, action) => {
      state.getEmployees = {
        ...initialState.getEmployees,
        error: action.payload
      }
    },
    getEmployeeLoading: (state) => {
      state.getEmployee.loading = true
    },
    getEmployeeSuccess: (state, action) => {
      state.getEmployee.loading = false
      state.getEmployee.loaded = true
      state.getEmployee.data = action.payload
      state.getEmployee.error = null
    },
  }
});

export const {
  getEmployeesLoading,
  getEmployeesSuccess,
  getEmployeesError,
  getEmployeeLoading,
  getEmployeeSuccess
} = employeesSlice.actions;