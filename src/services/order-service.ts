import {AxiosRequestConfig} from "axios";
import {RequestBackend} from "../utils/requests.ts";
import {OrderDTO} from "../models/order.ts";

export function findByIdRequest(id: number) {
    const config : AxiosRequestConfig = {
        url: `/orders/${id}`,
        // precisa de autorização, por isso o comando abaixo
        withCredentials: true,
    }

    return RequestBackend(config);
}

export function placeOrderRequest(cart: OrderDTO) {

    const config : AxiosRequestConfig = {
        url: "/orders",
        method: "POST",
        withCredentials: true,
        // data é o corpo
        data: cart
    }

    return RequestBackend(config);
}