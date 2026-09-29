import { z } from 'zod';

const statusEnum = z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);
const priorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);

export const createTaskSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(200, 'Title must be less than 200 characters')
        .trim(),
    description: z
        .string()
        .max(2000, 'Description must be less than 2000 characters')
        .optional()
        .nullable(),
    status: statusEnum.optional(),
    priority: priorityEnum.optional(),
    dueDate: z
        .string()
        .datetime({ message: 'Invalid date format' })
        .optional()
        .nullable(),
});

export const updateTaskSchema = createTaskSchema.partial();