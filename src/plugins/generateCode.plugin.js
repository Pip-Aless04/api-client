export const generateCode = (length = 6) => {
    let codigo = '';
    for (let i = 0; i < length; i++) {
        codigo += Math.floor(Math.random() * 10);
    }
    return codigo;
}