import './styles.css';
import SearchBar from "../../../components/SearchBar";
import CatalogCard from "../../../components/CatalogCard";
import ButtonNextPage from "../../../components/ButtonNextPage";
import {useEffect, useState} from "react";
import {ProductDTO} from "../../../models/product.ts";
import * as productService from '../../../services/product-service.ts';

export default function Catalog() {

    // ProductDTO[] pq é uma lista de produtos
    const [products, setProducts] = useState<ProductDTO[]>([]);

    useEffect(() => {
        productService.findAll()
            .then(response => {
                // .content pq a resposta esta dentro da lista content (postman)
                setProducts(response.data.content);
            });
    }, []);

    return (
        <main>
            <section id="catalog-section" className="dsc-container">
                <SearchBar/>
                <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                    {
                        // Não esquecer de uma "key" para coleções
                        products.map(
                            product => <CatalogCard key={product.id} product={product}/>
                        )
                    }
                </div>

                <ButtonNextPage/>
            </section>

        </main>
    );
}