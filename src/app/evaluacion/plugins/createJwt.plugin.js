import jwt from 'jsonwebtoken';

export const createToken = async ({info,time}) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { info },
            process.env.SECRET_JWT_KEY, 
            { expiresIn: time },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
};