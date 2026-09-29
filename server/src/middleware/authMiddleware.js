import { verifyToken } from '../utils/jwt.js';

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new Error('Not authorized, no token');
            error.status = 401;
            return next(error);
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyToken(token);

        req.user = { userId: decoded.userId };

        next();
    } catch (error) {
        error.status = 401;
        error.message = error.message || 'Not authorized, invalid token';
        next(error);
    }
};