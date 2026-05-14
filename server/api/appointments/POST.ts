import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { appointments } from '@/server/db/schema';
import { getAuth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: req.headers as unknown as Headers });

    const { clientName, clientEmail, clientPhone, serviceId, date, time, notes } = req.body;
    if (!clientName || !clientEmail || !clientPhone || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await db.insert(appointments).values({
      clientName,
      clientEmail,
      clientPhone,
      serviceId: serviceId ? parseInt(serviceId) : null,
      date,
      time,
      notes,
      userId: session?.user?.id ?? null,
      status: 'pending',
    });
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create appointment', message: String(err) });
  }
}
