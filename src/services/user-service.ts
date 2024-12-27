import {RequestBackend} from "../utils/requests.ts";
import {AxiosRequestConfig} from "axios";

// função precisa do token
export function findMe() {

    const config : AxiosRequestConfig ={
        url: "/users/me",
        withCredentials: true,
    }

    return RequestBackend(config);
}