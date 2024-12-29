import "./styles.css";
import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";
import {useEffect, useState} from "react";
import * as productService from "../../../services/product-service.ts";
import {ProductDTO} from "../../../models/product.ts";

type QueryParams = {
    page: number;
    name: string;
}


export default function ProductListing() {

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ""
    });

    const [products, setProducts] = useState<ProductDTO[]>([]);

    const [isLastPage, setIsLastPage] = useState<boolean>(false);

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


    return (
        <main>
            <section id="product-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>

                <div className="dsc-btn-page-container dsc-mb20">
                    <div className="dsc-btn dsc-btn-white">Novo</div>
                </div>

                <form className="dsc-search-bar">
                    <button type="submit">🔎︎</button>
                    <input type="text" placeholder="Nome do produto"/>
                    <button type="reset">🗙</button>
                </form>

                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                    <tr>
                        <th className="dsc-tb576">ID</th>
                        <th></th>
                        <th className="dsc-tb768">Preço</th>
                        <th className="dsc-txt-left">Nome</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map(products => (
                            <tr>
                                <td className="dsc-tb576">{products.id}</td>
                                <td><img className="dsc-product-listing-image" src={products.imgUrl} alt={products.name}/></td>
                                <td className="dsc-tb768">R$ {products.price.toFixed(2)}</td>
                                <td className="dsc-txt-left">{products.name}</td>
                                <td><img className="dsc-product-listing-btn" src={editIcon} alt="Editar"/></td>
                                <td><img className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar"/></td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>

                <div className="dsc-btn-next-page">Carregar mais</div>
            </section>
        </main>
    );
}