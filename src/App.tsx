import {Navigate, BrowserRouter, Route, Routes} from "react-router-dom";
import Catalog from "./routes/ClientHome/Catalog";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import ClientHome from "./routes/ClientHome";
import Cart from "./routes/ClientHome/Cart";
import {useState} from "react";
import {ContextCartCount} from "./utils/context-cart.ts";
import Login from "./routes/ClientHome/Login";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";

export default function App() {

    const [contextCartCount, setContextCartCount] = useState<number>(0);

    return (
        // Provider Provendo o useState na aplicação
        // sempre que o numero de itens do carrinho mudar, setamos o componente
        <ContextCartCount.Provider value={{contextCartCount, setContextCartCount}}>
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<ClientHome/>}>
                        <Route index element={<Catalog/>}/>
                        <Route path="catalog" element={<Catalog/>}/>
                        <Route path="product-details/:productId" element={<ProductDetails/>}/>
                        <Route path="cart" element={<Cart/>}/>
                        <Route path="login" element={<Login/>}/>
                    </Route>

                    <Route path="/admin/" element={<Admin/>}>
                        <Route index element={<AdminHome/>} />
                    </Route>
                    <Route path="*" element={<Navigate to="/"/>}/>

                </Routes>
            </BrowserRouter>
        </ContextCartCount.Provider>
    );
}

