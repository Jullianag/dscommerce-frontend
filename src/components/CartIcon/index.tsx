import "./styles.css";
import cartIcon from "../../assets/cart.svg";
import {useContext} from "react";
import {ContextCartCount} from "../../utils/context-cart.ts";

export default function CartIcon() {

    // não precisa dos dois dados
    const {contextCartCount} = useContext(ContextCartCount);

    return (
        <>
            <img src={cartIcon} alt="Carrinho de compras"/>

            {
                contextCartCount > 0 &&
                /* tamanho de itens da lista do carrrinho */
                <div className="dsc-cart-count">{contextCartCount}</div>
            }

        </>
    );

}