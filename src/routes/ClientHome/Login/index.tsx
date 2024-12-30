import './styles.css';
import {loginRequest} from "../../../services/auth-service.ts";
import {useContext, useState} from "react";
import * as authService from "../../../services/auth-service.ts";
import {useNavigate} from "react-router-dom";
import {ContextToken} from "../../../utils/context-token.ts";
import FormInput from "../../../components/FormInput";
import * as forms from "../../../utils/forms.ts";

export default function Login() {

    const { setContextTokenPayload } = useContext(ContextToken);

    const navigate = useNavigate();

    const [formData, setFormData] = useState<any>({
        // o username e o password passaram a ser objetos
        username: {
            value: "",
            id: "username",
            name: "username",
            type: "text",
            placeholder: "Email",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());},
            message: "Favor informar um email válido",
        },
        password: {
            value: "",
            id: "password",
            name: "password",
            type: "password",
            placeholder: "Senha",
        }
    });

    function handleSubmit(event: any) {
        event.preventDefault();
        loginRequest(formData)
        // consutlar forms.ts
        authService.loginRequest(forms.toValue(formData))
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
        // consultar o arquivo forms.ts
        setFormData(forms.update(formData, name, value));
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
                                    <FormInput
                                        { ...formData.username }
                                        /*
                                        A forma acima substitui o que estava aqui
                                        // mesmo valor no name que está definido no const
                                        name="username"
                                        value = {formData.username.value}
                                        type="text"
                                        placeholder="Email"
                                         */
                                        className="dsc-form-control"
                                        /* onChange deve ser mantido, pois toda vez que algo for digitado na caixinha,
                                         o valor seja alterado
                                         */
                                        // quando se faz o value, devemos fazer o onChange tbm
                                        onChange={handleInputChange}
                                    />
                                    <div className="dsc-form-error"></div>
                                </div>
                                <div>
                                    <FormInput
                                        { ...formData.password }
                                        className="dsc-form-control"
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