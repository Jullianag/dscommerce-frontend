import {RequestBackend} from "../utils/requests.ts";
import {AxiosRequestConfig} from "axios";

// sempre usar o sufixo Request
export function findPageRequest(page: number, name: string, size = 12, sort = "name") {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/products",
        params: {
            page,
            name,
            size,
            sort
        }
    }

    return RequestBackend(config);
}

export function findById(id: number) {
    return RequestBackend({ url: `/products/${id}`});
}

