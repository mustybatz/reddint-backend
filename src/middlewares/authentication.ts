import { jwtHelper } from '../helpers/jwt.helper';
import { Request, Response, NextFunction } from "express";

/**
 * Verifies the JWT token and sets the token payload to req.body.user
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 * @returns Executes the next function
 */
export const authentication = (req: Request, res: Response, next: NextFunction) => {


    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
        });
    }

    try {
        const decoded = jwtHelper.verify(token);
        req.body.user = decoded;
        next();
    } catch (e) {
        console.error(`[AUTH MIDDLEWARE]: ${e}`);
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
};