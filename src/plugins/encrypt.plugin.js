export const bcryptPlugin = (encrypt) => {
    return (password) => {
        return encrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    }
}

