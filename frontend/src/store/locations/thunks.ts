import { Dispatch } from '@reduxjs/toolkit'

import { getLocationsLoading, getLocationsSuccess } from '.'

import { getLocations } from '@/lib/baas/locations'

export const getLocationsThunk: any = () => {
  return async (dispatch: Dispatch) => {
      dispatch(getLocationsLoading())

      const responsives = await getLocations()

      dispatch(getLocationsSuccess(responsives))
      
  }
}