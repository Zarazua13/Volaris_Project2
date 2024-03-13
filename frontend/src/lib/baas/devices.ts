import axios from 'axios'
import * as z from "zod"

import { getToken } from '../storage'
import { createDeviceFormSchema } from '../devices'

import { request } from '@/lib/request'

import { Device } from '@/interfaces/devices'
import { envs } from '@/config'

const BACKEND_API_URL = envs.BASE_URL

export const getDevice = (deviceId: number | string) => {
  return request(`${BACKEND_API_URL}/api/devices/${deviceId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }) as Promise<Device>
}

export const getDevices = () =>
  request(BACKEND_API_URL + '/api/devices', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }) as Promise<Device[]>

export const postDevice = (values: z.infer<typeof createDeviceFormSchema>) => {
  return axios.post(BACKEND_API_URL + '/api/devices', values)
}
