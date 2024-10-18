import './styles.css';
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonInverse from "../../../components/ButtonInverse";
import * as productService from '../../../services/product-service.ts';
import {useParams} from "react-router-dom";

export default function ProductDetails() {

    const params = useParams();

    const product = productService.findById(Number(params.productId));

    return (

        <main>
            <section id="product-details-section" className="dsc-container">
                {
                    // testando se o objeto existe
                    product &&
                    <ProductDetailsCard product={product}/>
                }
                <div className="dsc-btn-page-container">
                    <ButtonPrimary text="Comprar"/>
                    <ButtonInverse text="Inicio"/>
                </div>
            </section>

        </main>

    );
}
