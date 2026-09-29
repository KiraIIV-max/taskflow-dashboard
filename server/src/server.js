import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import prisma from './lib/prisma.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ───────────────────────────────────────
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// ─── Routes ─────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down...');
    await prisma.$disconnect();
    process.exit(0);
});