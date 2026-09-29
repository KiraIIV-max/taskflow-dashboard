import prisma from '../lib/prisma.js';
import { createTaskSchema, updateTaskSchema } from '../validators/taskValidator.js';

export const getTasks = async (req, res, next) => {
    try {
        const { status, priority, search, sort } = req.query;

        const where = { userId: req.user.userId };

        if (status && status !== 'All') {
            where.status = status;
        }

        if (priority && priority !== 'All') {
            where.priority = priority;
        }

        if (search && search.trim()) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ];
        }

        let orderBy = { createdAt: 'desc' };

        if (sort === 'oldest') orderBy = { createdAt: 'asc' };
        else if (sort === 'dueDate') orderBy = { dueDate: 'asc' };
        else if (sort === 'priority') orderBy = { priority: 'desc' };

        const tasks = await prisma.task.findMany({
            where,
            orderBy,
        });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: { tasks },
        });
    } catch (error) {
        next(error);
    }
};

export const getTask = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            const error = new Error('Invalid task ID');
            error.status = 400;
            return next(error);
        }

        const task = await prisma.task.findFirst({
            where: { id, userId: req.user.userId },
        });

        if (!task) {
            const error = new Error('Task not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: { task },
        });
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req, res, next) => {
    try {
        const result = createTaskSchema.safeParse(req.body);
        if (!result.success) {
            const error = new Error(result.error.issues[0].message);
            error.status = 400;
            return next(error);
        }

        const { title, description, status, priority, dueDate } = result.data;

        const task = await prisma.task.create({
            data: {
                title,
                description: description ?? null,
                status: status ?? 'TODO',
                priority: priority ?? 'MEDIUM',
                dueDate: dueDate ? new Date(dueDate) : null,
                userId: req.user.userId,
            },
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: { task },
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            const error = new Error('Invalid task ID');
            error.status = 400;
            return next(error);
        }

        const existingTask = await prisma.task.findFirst({
            where: { id, userId: req.user.userId },
        });

        if (!existingTask) {
            const error = new Error('Task not found');
            error.status = 404;
            return next(error);
        }

        const result = updateTaskSchema.safeParse(req.body);
        if (!result.success) {
            const error = new Error(result.error.issues[0].message);
            error.status = 400;
            return next(error);
        }

        const { title, description, status, priority, dueDate } = result.data;

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(status !== undefined && { status }),
                ...(priority !== undefined && { priority }),
                ...(dueDate !== undefined && {
                    dueDate: dueDate ? new Date(dueDate) : null,
                }),
            },
        });

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: { task: updatedTask },
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            const error = new Error('Invalid task ID');
            error.status = 400;
            return next(error);
        }

        const existingTask = await prisma.task.findFirst({
            where: { id, userId: req.user.userId },
        });

        if (!existingTask) {
            const error = new Error('Task not found');
            error.status = 404;
            return next(error);
        }

        await prisma.task.delete({ where: { id } });

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};