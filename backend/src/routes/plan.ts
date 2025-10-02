import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  const { planId, userId, title, checklist, status } = req.body ?? {};

  if (!userId || !title) {
    return res.status(400).json({ error: 'userId and title are required' });
  }

  if (checklist && !Array.isArray(checklist)) {
    return res.status(400).json({ error: 'checklist must be an array' });
  }

  const normalizedChecklist = checklist ?? [];
  const normalizedStatus = status ?? 'draft';

  const query = `
    INSERT INTO plans (id, user_id, title, checklist, status)
    VALUES (COALESCE($1::uuid, gen_random_uuid()), $2::uuid, $3::text, $4::jsonb, $5::text)
    ON CONFLICT (id) DO UPDATE
    SET title = EXCLUDED.title,
        checklist = EXCLUDED.checklist,
        status = EXCLUDED.status,
        updated_at = NOW()
    RETURNING *;
  `;

  const values = [planId ?? null, userId, title, JSON.stringify(normalizedChecklist), normalizedStatus];

  try {
    const { rows } = await pool.query(query, values);
    return res.status(200).json({ plan: rows[0] });
  } catch (error) {
    console.error('Failed to save plan', error);
    return res.status(500).json({ error: 'Failed to save plan' });
  }
});

export default router;
