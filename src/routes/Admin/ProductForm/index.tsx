import "./styles.css";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FormInput from "../../../components/FormInput";
import * as forms from "../../../utils/forms.ts";
import * as productService from "../../../services/product-service.ts";
import * as categoryService from "../../../services/category-service.ts";
import FormTextArea from "../../../components/FormTextArea";
import {CategoryDTO} from "../../../models/category.ts";
import FormSelect from "../../../components/FormSelect";
import {selectStyles} from "../../../utils/select.ts";

export default function ProductForm() {

    // para ter condições de acessar o parâmetro da rota
    const params = useParams();

    const isEditing = params.productId !== "create";

    // categories do backend
    const [categories, setCategories] = useState<CategoryDTO[]>([]);

    const [formData, setFormData] = useState<any>({
        // name, price, description é para ser igual ao postman
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: function (value: string) {
                //return value.length >= 3 && value.length <= 80;
                return /^.{3,80}$/.test(value);
            },
            message: "Favor informar um nome de 3 a 80 caracteres!",
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
            validation: function (value: any) {
                return Number(value) > 0;
            },
            message: "Favor informar um valor positivo!"
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem",
        },
        description: {
            value: "",
            id: "description",
            name: "description",
            type: "text",
            placeholder: "Descrição",
            validation: function (value: string) {
                //return value.length >= 3 && value.length <= 80;
                return /^.{10,}$/.test(value);
            },
            message: "A descrição deve ter pelo menos 10 caracteres!"
        },
        // categories da caixinha
        categories: {
            value: [],
            id: "categories",
            name: "categories",
            placeholder: "Categorias",
            validation: function (value: CategoryDTO[]) {
                return value.length > 0;
            },
            message: "Escolha ao menos uma categoria"
        }
    });

    useEffect(() => {
        categoryService.findAllRequest()
            .then(response => {
                setCategories(response.data);
            })
    }, []);

    useEffect(() => {

        if (isEditing) {
            // convertendo para número
            productService.findById(Number(params.productId))
                .then(response => {
                    const newFormDate = forms.updateAll(formData, response.data);
                    setFormData(newFormDate);
                })
        }
    }, []);

    function handleInputChange(event: any) {
        //const result = forms.updateAndValidate(formData, event.target.name, event.target.value);
        //setFormData(result);
        setFormData(forms.updateAndValidate(formData, event.target.name, event.target.value))
    }

    function handleTurnDirty(name: string) {
        // função que vai sujar o campo name
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    }

    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form">
                        <h2>Dados do produto</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.name}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error">{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.price}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error">{formData.price.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.imgUrl}
                                    className="dsc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <FormSelect
                                    {...formData.categories}
                                    className="dsc-form-control dsc-form-select-container"
                                    styles={selectStyles}
                                    options={categories}
                                    onChange={(obj: any) => {
                                        const newFormData = forms.updateAndValidate(formData, "categories", obj);
                                        setFormData(newFormData);
                                    } }
                                    onTurnDirty={handleTurnDirty}
                                    isMulti
                                    //para criar "outro" value e label
                                    getOptionLabel={(obj: any) => obj.name}
                                    getOptionValue={(obj: any) => String(obj.id)}
                                />
                                <div className="dsc-form-error">{formData.categories.message}</div>
                            </div>

                            <div>
                                <FormTextArea
                                    {...formData.description}
                                    className="dsc-form-control dsc-textarea"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error">{formData.description.message}</div>
                            </div>

                        </div>

                        <div className="dsc-product-form-buttons">
                            <Link to="/admin/products">
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                            </Link>

                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}