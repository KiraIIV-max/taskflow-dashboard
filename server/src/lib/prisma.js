
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb"; 
import 'dotenv/config';                                 

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

const globalForPrisma = globalThis 
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if(process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
export default prisma
