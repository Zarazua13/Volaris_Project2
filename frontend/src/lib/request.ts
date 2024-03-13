import axios, { type AxiosRequestConfig, type AxiosError } from "axios";

import { transform, camelCase, isArray, isObject } from "lodash";

// TODO: Soluciones errores de typescript

export const camelize = (obj) =>
  transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);

    acc[camelKey] = isObject(value) ? camelize(value) : value;
  });

export async function request<T>(
  url: string,
  config: AxiosRequestConfig,
): Promise<T> {
  const res = await axios<T | T[]>(url, config);
  const { data } = res;
  if (data === null) Promise.reject("no content");
  if (isArray(data)) return data.map((e) => camelize(e)) as T[];
  return camelize(data) as T;
}

// TODO: Hacer una funcion que compruebe el status de la respuesta
