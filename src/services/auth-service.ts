import {CredentialsDTO} from "../models/auth.ts";
import {CLIENT_ID, CLIENT_SECRET} from "../utils/system.ts";
import * as QueryString from "qs";
import {AxiosRequestConfig} from "axios";
import {RequestBackend} from "../utils/requests.ts";

export function loginRequest (loginData: CredentialsDTO) {

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }

    // desestruturar o loginData e acrescentar o grant_type
    const requestBody = QueryString.stringify({...loginData, grant_type: "password"});

    const config : AxiosRequestConfig = {
        method: "POST",
        url: "/oauth/token",
        data: requestBody,
        headers: headers
    }

    return RequestBackend(config);
}