// /pages/api/addusers.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fname, lname, emails, pnum } = req.body;

    // Basic validation (add more robust validation)


    const newUser = await prisma.users.create({
      data: {
        FirstName: fname,
        LastName: lname,
        Email: emails,
        Password: pnum, // Assuming 'Password' is the column name
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
}