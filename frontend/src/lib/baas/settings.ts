import axios from "axios";

import { request } from "@/lib/request";

import { getToken } from "../storage";

import { envs } from "@/config";

import { Settings } from "@/interfaces";

const BACKEND_API_URL = envs.BASE_URL;

export const getSettingsRequest = () => {
  return request<{ [key: string]: any }>(`${BACKEND_API_URL}/api/settings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const postSettingsRequest = (settings: Settings) => {
  return axios.post<Settings>(
    `${BACKEND_API_URL}/api/settings`,
    {
      reference_number: settings.referenceNumber,
      default_comment: settings.defaultComment,
      default_assigner: settings.defaultAssigner,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
};
