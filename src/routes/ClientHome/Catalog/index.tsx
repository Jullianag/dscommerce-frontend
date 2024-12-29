import './styles.css';
import SearchBar from "../../../components/SearchBar";
import CatalogCard from "../../../components/CatalogCard";
import ButtonNextPage from "../../../components/ButtonNextPage";
import {useEffect, useState} from "react";
import {ProductDTO} from "../../../models/product.ts";
import * as productService from '../../../services/product-service.ts';

type QueryParams = {
    page: number;
    name: string;
}

export default function Catalog() {

    const [isLastPage, setIsLastPage] = useState<boolean>(false);

    // sempre que se usar mais de um parâmetro para a buscar, usar objeto
    // ProductDTO[] pq é uma lista de produtos
    const [products, setProducts] = useState<ProductDTO[]>([]);

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ""
    });

    useEffect(() => {

        productService.findPageRequest(queryParams.page, queryParams.name)
            .then(response => {
                // .content pq a resposta esta dentro da lista content (postman)
                const nextPage = response.data.content;
                setProducts(products.concat(nextPage));
                setIsLastPage(response.data.last);
            });
        // colocar nas dependencias tbm (monitoração), useEffect observa
    }, [queryParams]);

    function handleSearch(searchText: string) {
        // zera a lista para fazer uma busca
        setProducts([]);
        // page: 0 para poder comerçar a busca da página zero
        setQueryParams({...queryParams, page: 0, name: searchText});
    }

    function handleNextPageClick() {
        setQueryParams({...queryParams, page: queryParams.page + 1});
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

                {
                    !isLastPage &&
                    <div>
                        <ButtonNextPage onNextPage={handleNextPageClick}/>
                    </div>
                }

            </section>

        </main>
    );
}