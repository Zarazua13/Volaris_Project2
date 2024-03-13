import { Dispatch } from '@reduxjs/toolkit'

import { getDevicesError, getDevicesLoading, getDevicesSuccess } from '.'

import { getDevices } from '@/lib/baas/devices'


export const getDevicesThunk: any = () => {
  return async (dispatch: Dispatch) => {

    try {
      
      dispatch(getDevicesLoading())
      
      const responsives = await getDevices()
      
      dispatch(getDevicesSuccess(responsives))
      
    } catch(err) {
      
      dispatch(getDevicesError(err))

    }
      
  }
}
