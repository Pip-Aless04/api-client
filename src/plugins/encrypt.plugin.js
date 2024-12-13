export const bcryptPlugin = (encrypt) => {
    return (password) => {
        console.log('entro a bcrypt plugin');
        console.log(password);
        console.log(process.env.SALT_ROUNDS);
        return encrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    }
}

