import axios from 'axios'

import { envs } from '@/config'

const BASE_URL = envs.AZURE_REDIRECT_URI

interface SignUpResponse {
  token: string
}

export const loginRequest = (idToken: string) => axios.post<SignUpResponse>(`${BASE_URL}/auth/signup`, { jwt: idToken })