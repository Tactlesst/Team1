import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
if (req.method !== 'GET') return res.status(405).end(); // Allow only GET requests

try {
const users = await prisma.user.findMany(); // Replace `user` with your actual table name
res.status(200).json(users);
} catch (error) {
res.status(500).json({ error: 'Database query failed', details: error.message });
}
}