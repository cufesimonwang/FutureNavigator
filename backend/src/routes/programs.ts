import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { degree, country, schoolId, q } = req.query;

  const conditions: string[] = [];
  const values: Array<string> = [];
  let paramIndex = 1;

  if (degree) {
    conditions.push(`p.degree_level = $${paramIndex++}`);
    values.push(String(degree));
  }

  if (country) {
    conditions.push(`s.country = $${paramIndex++}`);
    values.push(String(country));
  }

  if (schoolId) {
    conditions.push(`p.school_id = $${paramIndex++}`);
    values.push(String(schoolId));
  }

  if (q) {
    conditions.push(`(p.name ILIKE $${paramIndex} OR s.name ILIKE $${paramIndex})`);
    values.push(`%${String(q)}%`);
    paramIndex += 1;
  }

  let query = `
    SELECT p.id,
           p.name,
           p.degree_level,
           p.application_deadlines,
           p.tuition,
           p.metadata,
           s.id AS school_id,
           s.name AS school_name,
           s.country
    FROM programs p
    LEFT JOIN schools s ON p.school_id = s.id
  `;

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ' ORDER BY p.name LIMIT 50';

  try {
    const { rows } = await pool.query(query, values);
    res.json({ programs: rows });
  } catch (error) {
    console.error('Failed to fetch programs', error);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

export default router;
