// props: any deixa mais flexível para os dados
export default function FormInput(props: any) {

     /*
        devemos ter o "validation" fora da desestruturação
        para ser possível validar no input,
        pois este não possui este campo
     */
    const {
        validation,
        invalid = "false",
        dirty = "false",
        onTurnDirty,
        ...inputProps
    } = props;

    function handleBlur() {
        onTurnDirty(props.name);
    }

    return (

        // criando dentro do input um atributo adicional
        <input
            { ...inputProps }
            onBlur={handleBlur}
            data-invalid={invalid}
            data-dirty={dirty}
        />
    );
}