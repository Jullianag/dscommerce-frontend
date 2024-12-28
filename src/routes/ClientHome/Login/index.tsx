import './styles.css';
import {loginRequest} from "../../../services/auth-service.ts";
import {useContext, useState} from "react";
import {CredentialsDTO} from "../../../models/auth.ts";
import * as authService from "../../../services/auth-service.ts";
import {useNavigate} from "react-router-dom";
import {ContextToken} from "../../../utils/context-token.ts";

export default function Login() {

    const { setContextTokenPayload } = useContext(ContextToken);

    const navigate = useNavigate();

    const [formData, setFormData] = useState<CredentialsDTO>({
        username: '',
        password: ''
    })

    function handleSubmit(event: any) {
        event.preventDefault();
        loginRequest(formData)
        authService.loginRequest(formData)
            .then(response => {
                // salva no localStorage
                // pegar os dados no postman "access_token"
                authService.saveAccessToken(response.data.access_token);

                // salva após o login, para atualizar o carrinho
                setContextTokenPayload(authService.getAccessTokenPayload());

                navigate("/cart");
            })
            .catch(error => {
                console.log("Erro no login", error);
            })
    }

    function handleInputChange(event: any) {
        // pega o valor que esta digitado na caixinha
        const value = event.target.value;
        const name = event.target.name;
        setFormData({...formData, [name]: value})
    }

    return (
        <>
            <main>
                <section id="login-section" className="dsc-container">
                    <div className="dsc-login-form-container">
                        <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            <div className="dsc-form-controls-container">
                                <div>
                                    <input
                                        // mesmo valor no name que está definido no const
                                        name="username"
                                        value = {formData.username}
                                        className="dsc-form-control"
                                        type="text"
                                        placeholder="Email"
                                        // quando se faz o value, devemos fazer o onChange tbm
                                        onChange={handleInputChange}
                                    />
                                    <div className="dsc-form-error"></div>
                                </div>
                                <div>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        className="dsc-form-control"
                                        type="password"
                                        placeholder="Senha"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="dsc-login-form-buttons dsc-mt20">
                                <button type="submit" className="dsc-btn dsc-btn-blue">Entrar</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}