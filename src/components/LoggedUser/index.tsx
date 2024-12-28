import * as authService from "../../services/auth-service.ts";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ContextToken} from "../../utils/context-token.ts";

export default function loggedUser() {

    const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);

    function handleLogoutClick() {
        authService.logout()
        // depois do comando acima nao existirá mais o token
        setContextTokenPayload(undefined);
    }

    return (
        //se existir
        contextTokenPayload && authService.isAuthenticated()
            ? (
                <div className="dsc-logged-user">
                    <p>{contextTokenPayload?.user_name}</p>
                    <span onClick={handleLogoutClick}>Sair</span>
                </div>
            )
            : (
                <Link to="/login">
                    Entrar
                </Link>
            )

    );
}