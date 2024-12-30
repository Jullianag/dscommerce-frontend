export function update(inputs: any, name: string, newValue: any) {

    // pegar o que já estava no inputs e no name
    // sobrescreve somente o valor com o atributo name
    return { ...inputs, [name]: { ...inputs[name], value: newValue } };
}