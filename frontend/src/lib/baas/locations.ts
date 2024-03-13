import { request } from '@/lib/request'

import { getToken } from '../storage'

import { envs } from '@/config'

const BACKEND_API_URL = envs.BASE_URL

export function getLocations<T> (): Promise<T[]> {
  return request(BACKEND_API_URL + '/api/locations', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }) as Promise<T[]>
}
