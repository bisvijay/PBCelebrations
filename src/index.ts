import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Booking routes
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = await prisma.booking.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        eventType: req.body.eventType,
        eventDate: new Date(req.body.eventDate),
        guestCount: parseInt(req.body.guestCount),
        additionalNotes: req.body.additionalNotes || ''
      }
    });
    res.json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { eventDate: 'asc' }
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
