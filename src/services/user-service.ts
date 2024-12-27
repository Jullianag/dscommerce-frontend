import {RequestBackend} from "../utils/requests.ts";
import * as authService from "./auth-service.ts";

// função precisa do token
export function findMe() {

    const headers = {
    Authorization: "Bearer " + authService.getAccessToken()
    }

    return RequestBackend({ url: `/users/me`, headers: headers });
}