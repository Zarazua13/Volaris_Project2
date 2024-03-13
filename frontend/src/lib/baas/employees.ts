import { request } from '@/lib/request'

import { getToken } from '../storage'

import { envs } from '@/config'

const BACKEND_API_URL = envs.BASE_URL

export const getEmployee = async (employeeNumber: number | string) => {
  return request(`${BACKEND_API_URL}/api/employees/${employeeNumber}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }) 
}

export const getEmployees = () =>
  request(BACKEND_API_URL + '/api/employees', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
