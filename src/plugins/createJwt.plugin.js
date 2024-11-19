// createJwt.plugin.js
import jwt from 'jsonwebtoken';

export const createToken = (info, expiresIn = '1d') => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { info }, 
            process.env.SECRET_JWT_KEY, 
            { expiresIn: expiresIn },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
};
