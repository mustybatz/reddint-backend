import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    console.error('JWT_SECRET is not set');
    process.exit(1);
}

export const jwtHelper = {
    sign: (payload: any) => {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1d'
        });
    },
    verify: (token: string) => {
        return jwt.verify(token, JWT_SECRET);
    },
};
