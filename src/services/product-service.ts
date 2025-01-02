import {RequestBackend} from "../utils/requests.ts";
import {AxiosRequestConfig} from "axios";
import {ProductDTO} from "../models/product.ts";

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
    return RequestBackend({url: `/products/${id}`});
}

export function deletebyId(id: number) {

    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `/products/${id}`,
        withCredentials: true
    }

    return RequestBackend(config);
}

export function updateRequest(obj: ProductDTO) {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `/products/${obj.id}`,
        withCredentials: true,
        data: obj
    }
    return RequestBackend(config);
}

export function insertRequest(obj: ProductDTO) {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/products/",
        withCredentials: true,
        data: obj
    }
    return RequestBackend(config);
}