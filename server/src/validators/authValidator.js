import { z } from 'zod';

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, 'Name is required')
            .max(50, 'Name must be less than 50 characters')
            .trim(),
        email: z
            .string()
            .email('Invalid email address')
            .trim()
            .toLowerCase(),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(100, 'Password must be less than 100 characters'),
        confirmPassword: z
            .string()
            .min(6, 'Confirm Password must be at least 6 characters')
            .max(100, 'Confirm Password must be less than 100 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const loginSchema = z.object({
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    password: z.string().min(1, 'Password is required'),
});