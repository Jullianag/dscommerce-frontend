import './styles.css';
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonInverse from "../../../components/ButtonInverse";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProductDTO} from "../../../models/product.ts";
import * as productService from '../../../services/product-service.ts';

export default function ProductDetails() {

    const params = useParams();

    const navigate = useNavigate();

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
                    <ButtonPrimary text="Comprar"/>
                    <Link to="/">
                        <ButtonInverse text="Inicio"/>
                    </Link>
                </div>
            </section>

        </main>

    );
}
