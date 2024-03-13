import { envs } from "@/config";
import axios, { AxiosResponse } from "axios";

interface Message {
  message: string
}

const BACKEND_API_URL = envs.BASE_URL;

export function uploadFileRequest(file: File) {
  return axios.postForm<Message>(BACKEND_API_URL + "/api/responsives/upload", file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
