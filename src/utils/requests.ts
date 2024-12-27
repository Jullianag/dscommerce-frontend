import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL} from "./system.ts";
import * as authService from "../services/auth-service.ts";
import {history} from "./history.ts";

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

// REQUEST INTERCEPTOR
axios.interceptors.request.use(
    function (config) {
        // fazer alguma coisa antes da requisição ser enviada
        return config;
    },
    function (error) {
        // faz algo com erro de requisição
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR
axios.interceptors.response.use(
    function (response) {
        // fazer alguma coisa se o status da resposta é ok
        return response;
    },
    function (error) {
        // faz algo com o erro da resposta

        if (error.response.status === 401) {
            history.push("/login");
        }
        if (error.response.status === 403) {
            history.push("/login");
        }

        return Promise.reject(error);
    }
);