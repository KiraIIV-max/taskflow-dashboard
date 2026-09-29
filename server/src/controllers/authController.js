import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { generateToken } from '../utils/jwt.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

export const register = async (req, res, next) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            const error = new Error(result.error.issues[0].message);
            error.status = 400;
            return next(error);
        }

        const { name, email, password } = result.data;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            const error = new Error('Email already registered');
            error.status = 409;
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        const token = generateToken({ userId: newUser.id });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { user: newUser, token },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            const error = new Error(result.error.issues[0].message);
            error.status = 400;
            return next(error);
        }

        const { email, password } = result.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            return next(error);
        }

        const token = generateToken({ userId: user.id });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                },
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const me = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};