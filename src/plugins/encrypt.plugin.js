/*
export const bcryptPlugin = (encrypt) => {
    return (password) => {
        console.log('entro a bcrypt plugin');
        console.log(password);
        console.log(process.env.SALT_ROUNDS);
        return encrypt.compare(password, parseInt(process.env.SALT_ROUNDS));
    }
}
*/
export class BcryptPlugin {
    constructor(encrypt) {
        this.encrypt = encrypt;
    }

    async compare(password, hash) {
        console.log({
            password,
            hash
        });
        return await this.encrypt.compare(password, hash); // Asíncrono
    }

    async hash(password) {
        console.log({ password });
        return await this.encrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    }
}
