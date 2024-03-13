import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store'
import { getEmployeesThunk } from '@/store/employees'

import { ErrorWarning, TableSkeleton, TitlePage } from '@/components'
import { NewEmployee, TableEmployees } from './components/'


export const Employees = () => {
  const dispatch = useDispatch()
  const { loading, loaded, error, data } = useSelector((state: RootState) => state.employees.getEmployees)

  useEffect(() => {
    getEmployees()
  }, [])
  
  const getEmployees = () => {
    dispatch(getEmployeesThunk())
  }

  return (
    <div className='w-full'>
      <TitlePage title='Empleados'>
        <NewEmployee />
      </TitlePage>
      {error && <ErrorWarning onRetry={getEmployees} />}
      {loading && <TableSkeleton />}
      {loaded && <TableEmployees employees={data} />}      
    </div>
  )
}






// return null