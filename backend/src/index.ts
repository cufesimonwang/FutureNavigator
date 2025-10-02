import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import healthzRouter from './routes/healthz.js';
import programsRouter from './routes/programs.js';
import planRouter from './routes/plan.js';
import ragRouter from './routes/rag.js';

dotenv.config();

const app = express();
const port = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;
const host = process.env.API_HOST ?? '0.0.0.0';

app.use(cors());
app.use(express.json());

app.use('/api/healthz', healthzRouter);
app.use('/api/programs', programsRouter);
app.use('/api/plan', planRouter);
app.use('/api', ragRouter);

app.get('/', (_req, res) => {
  res.json({ name: 'FutureNavigator API', status: 'running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, host, () => {
  console.log(`API listening on http://${host}:${port}`);
});
