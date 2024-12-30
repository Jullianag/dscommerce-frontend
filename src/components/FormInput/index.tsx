// props: any deixa mais flexível para os dados
export default function FormInput(props: any) {

     /*
        devemos ter o "validation" fora da desestruturação
        para ser possível validar no input,
        pois este não possui este campo
     */
    const {validation, ...inputProps} = props;

    return (

        <input { ...inputProps }/>
    );
}