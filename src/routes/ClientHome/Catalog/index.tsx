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

    const [productName, setProductName] = useState("");

    useEffect(() => {

        productService.findPageRequest(0, productName)
            .then(response => {
                // .content pq a resposta esta dentro da lista content (postman)
                setProducts(response.data.content);
            });
        // colocar nas dependencias tbm (monitoração), useEffect observa
    }, [productName]);

    function handleSearch(searchText: string) {
        setProductName(searchText)
    }

    return (
        <main>
            <section id="catalog-section" className="dsc-container">
                {/* o component SearchBar deve ter esse evento nele */}
                <SearchBar onSearch={handleSearch}/>
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