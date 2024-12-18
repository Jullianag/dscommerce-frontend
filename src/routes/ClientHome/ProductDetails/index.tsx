import './styles.css';
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonInverse from "../../../components/ButtonInverse";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ProductDTO} from "../../../models/product.ts";
import * as productService from '../../../services/product-service.ts';
import * as cartService from '../../../services/cart-service.ts';
import {ContextCartCount} from "../../../utils/context-cart.ts";

export default function ProductDetails() {

    const params = useParams();

    const navigate = useNavigate();

    // mesmo nome do que foi estruturado no context-cart.ts
    const {setContextCartCount} = useContext(ContextCartCount);

    // declara o estado
    const [product, setProduct] = useState<ProductDTO>();

    useEffect(() => {
        productService.findById(Number(params.productId))
            .then(response => {
                setProduct(response.data);
            })
            .catch(() => {
                navigate("/");
            });
    }, []);

    function handleBuyClick() {

        // só adiciona no carrinho se o produto não for undefined
        if (product) {
            // chama a função que atualiza o carrinho
            cartService.addProduct(product);
            // contexto global atualizado (número de itens no carrinho)
            setContextCartCount(cartService.getCart().items.length);
            navigate("/cart");
        }
    }

    return (

        <main>
            <section id="product-details-section" className="dsc-container">
                {
                    /*
                    // testando se o objeto existe (ternário)
                    product ? <ProductDetailsCard product={product}/> : <h2>Código inválido</h2>

                     */

                    product &&
                    <ProductDetailsCard product={product}/>
                }
                <div className="dsc-btn-page-container">
                    <div onClick={handleBuyClick} className="dsc-pointer">
                        <ButtonPrimary text="Comprar"/>
                    </div>

                    <Link to="/">
                        <ButtonInverse text="Inicio"/>
                    </Link>
                </div>
            </section>

        </main>

    );
}
