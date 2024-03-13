import 'dotenv/config'
import { get } from "env-var"

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MYSQL_HOST: get('MYSQL_HOST').required().asString(),
  MYSQL_DATABASE: get('MYSQL_DATABASE').required().asString(),
  MYSQL_USERNAME: get('MYSQL_USERNAME').required().asString(),
  MYSQL_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
}