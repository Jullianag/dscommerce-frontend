import * as authService from "../../services/auth-service.ts";
import { Navigate } from "react-router-dom";

type Props = {
    children: JSX.Element;
}

export function PrivateRoute({children}: Props) {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login"/>;
    }
    return children;
}