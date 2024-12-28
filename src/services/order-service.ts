import {AxiosRequestConfig} from "axios";
import {RequestBackend} from "../utils/requests.ts";

export function findByIdRequest(id: number) {
    const config : AxiosRequestConfig = {
        url: `/orders/${id}`,
        withCredentials: true,
    }

    return RequestBackend(config);
}