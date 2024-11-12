/*este plugin recibe como primer parametro la libreria que se va a utilizar, en este caso bcrypt,
y desbues devuelve una funcion que realizara el encriptado en base a la libreria que se le pase*/

export const encryptPlugin = (bcrypt) => {
    return (password) => {
        return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    }
}
