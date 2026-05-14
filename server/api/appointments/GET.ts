import type { Request, Response } from 'express';
import { db } from '@/server/db/client';
import { appointments, services } from '@/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getAuth } from '@/lib/auth/auth';

export default async function handler(req: Request, res: Response) {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: req.headers as unknown as Headers });
    if (!session) return res.status(401).json({ error: 'Unauthorized' });

    const role = (session.user as { role?: string }).role;
    let rows;
    if (role === 'admin' || role === 'barber') {
      rows = await db
        .select({ appointment: appointments, service: services })
        .from(appointments)
        .leftJoin(services, eq(appointments.serviceId, services.id))
        .orderBy(desc(appointments.createdAt));
    } else {
      rows = await db
        .select({ appointment: appointments, service: services })
        .from(appointments)
        .leftJoin(services, eq(appointments.serviceId, services.id))
        .where(eq(appointments.userId, session.user.id))
        .orderBy(desc(appointments.createdAt));
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments', message: String(err) });
  }
}
