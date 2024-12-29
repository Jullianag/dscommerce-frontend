import {Navigate, Route, Routes} from "react-router-dom";
import Catalog from "./routes/ClientHome/Catalog";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import ClientHome from "./routes/ClientHome";
import Cart from "./routes/ClientHome/Cart";
import {useEffect, useState} from "react";
import {ContextCartCount} from "./utils/context-cart.ts";
import Login from "./routes/ClientHome/Login";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {history} from './utils/history';
import {PrivateRoute} from "./components/PrivateRoute";
import {AccessTokenPayloadDTO} from "./models/auth.ts";
import { ContextToken } from "./utils/context-token.ts";
import * as authService from "./services/auth-service.ts";
import * as cartService from "./services/cart-service.ts";
import Confirmation from "./routes/ClientHome/Confirmation";
import ProductListing from "./routes/Admin/ProductListing";
import ProductForm from "./routes/Admin/ProductForm";

export default function App() {

    const [contextCartCount, setContextCartCount] = useState<number>(0);

    const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

    useEffect(() => {

        // inicia a aplicação com o carrinho salvo do localStorage
        setContextCartCount(cartService.getCart().items.length);

        // se está autenticado salva no contexto, pois pega o token no localStorage
        if (authService.isAuthenticated()) {
            const payload = authService.getAccessTokenPayload();
            setContextTokenPayload(payload);
        }
    }, []);

    return (
        // Provider Provendo o useState na aplicação
        // sempre que o numero de itens do carrinho mudar, setamos o componente
        // <HistoryRouter history={history}> acessa módulos que não forem componentes react

        <ContextToken.Provider value={{contextTokenPayload, setContextTokenPayload}}>
            <ContextCartCount.Provider value={{contextCartCount, setContextCartCount}}>
                <HistoryRouter history={history}>
                    <Routes>

                        <Route path="/" element={<ClientHome/>}>
                            <Route index element={<Catalog/>}/>
                            <Route path="catalog" element={<Catalog/>}/>
                            <Route path="product-details/:productId" element={<ProductDetails/>}/>
                            <Route path="cart" element={<Cart/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="confirmation/:orderId" element={<PrivateRoute><Confirmation/></PrivateRoute>}/>
                        </Route>

                        <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN']}><Admin/></PrivateRoute>}>
                            <Route index element={<Navigate to="/admin/home"/>}/>
                            <Route path="home" element={<AdminHome/>}/>
                            <Route path="products" element={<ProductListing/>}/>
                            <Route path="products/:productId" element={<ProductForm/>}/>
                        </Route>
                        <Route path="*" element={<Navigate to="/"/>}/>

                    </Routes>
                </HistoryRouter>
            </ContextCartCount.Provider>
        </ContextToken.Provider>
    );
}

