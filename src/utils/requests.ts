import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL} from "./system.ts";
import * as authService from "../services/auth-service.ts";

export function RequestBackend(config: AxiosRequestConfig) {

    // se for verdade acrescenta o Authorizarion
    const headers = config.withCredentials
        ?
        {
            // mantem o que já tem
            ...config.headers,
            Authorization: "Bearer " + authService.getAccessToken()
        }
        : config.headers;

    return axios({...config, baseURL: BASE_URL, headers: headers});
}