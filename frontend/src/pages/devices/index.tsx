import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { RootState, getDevicesThunk } from '@/store'
import { ErrorWarning, TableSkeleton, TitlePage } from '@/components'

import { NewDevice, TableDevices } from './components'

export const Devices = () => {
  const dispatch = useDispatch()
  const { loading, success, error, data } = useSelector((state: RootState) => state.devices.getDevices)

  useEffect(() => {
    getDevices()
  }, [])
  
  const getDevices = () => {
    dispatch(getDevicesThunk())
  }

  return (
    <div className='w-full'>
      <TitlePage title='Dispositivos'>
        <NewDevice />
      </TitlePage>
      {error && <ErrorWarning onRetry={getDevices} />}
      {loading && <TableSkeleton />}
      {success && <TableDevices devices={data} />}      
    </div>
  )
}
