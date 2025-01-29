import cors from 'cors';

export const corsMiddleware = () => cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
        'http://localhost:3000',
        'https://popsdhcosite.azurewebsites.net',
        'https://dhco.pops.co.cr',
        ]; 
        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    }
})