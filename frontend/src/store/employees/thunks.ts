import { Dispatch } from '@reduxjs/toolkit'

import { getEmployee, getEmployees } from '@/lib/baas/employees'

import { getEmployeeLoading, getEmployeeSuccess, getEmployeesError, getEmployeesLoading, getEmployeesSuccess } from '.'

export const getEmployeesThunk: any = () => {
  return async (dispatch: Dispatch) => {

    try {

      dispatch(getEmployeesLoading())
      
      const employees = await getEmployees()

      dispatch(getEmployeesSuccess(employees))
    } catch(err) {
      
      dispatch(getEmployeesError(err))
    }
      
  }
}

export const getEmployeeThunk = (employeeNumber: string) => {
  return async (dispatch: Dispatch) => {
      dispatch(getEmployeeLoading())

      const employees = await getEmployee(employeeNumber)

      dispatch(getEmployeeSuccess(employees))
      
  }
}
