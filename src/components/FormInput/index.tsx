// props: any deixa mais flexível para os dados
export default function FormInput(props: any) {

     /*
        devemos ter o "validation" fora da desestruturação
        para ser possível validar no input,
        pois este não possui este campo
     */
    const {validation, invalid, ...inputProps} = props;

    return (

        // criando dentro do input um atributo adicional
        <input { ...inputProps } data-invalid={invalid}/>
    );
}