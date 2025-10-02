import { Router } from 'express';

const router = Router();

router.post('/qa', (_req, res) => {
  res.status(501).json({ error: 'RAG question answering is not implemented in this phase.' });
});

router.post('/ingest', (_req, res) => {
  res.status(501).json({ error: 'RAG ingestion pipeline is not implemented in this phase.' });
});

export default router;
