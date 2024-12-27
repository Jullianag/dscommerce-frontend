import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL} from "./system.ts";

export function RequestBackend(config: AxiosRequestConfig) {
    return axios({...config, baseURL: BASE_URL});
}