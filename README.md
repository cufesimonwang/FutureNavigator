# FutureNavigator — dev_simon

FutureNavigator is a Retrieval-Augmented Generation (RAG) chatbot that helps high school and undergraduate applicants (and their counselors or parents) plan, track, and optimize their university applications. In this phase we are scaffolding the product foundations before building the RAG experience.

## Value Proposition
- Centralize scattered admissions intelligence into a single assistant.
- Provide provenance-backed answers to reduce misinformation and guesswork.
- Generate personalized timelines, checklists, and reminders so nobody misses a deadline.
- Support counselors and parents with read-only visibility into student progress.

## Eight-Week Roadmap
| Week | Milestone | Highlights |
| ---- | --------- | ---------- |
| 1 | Repo & infrastructure setup | Branching strategy, Dockerized services, health checks |
| 2 | Data ingestion v0 | Document parsing, metadata capture |
| 3 | Retrieval v0 | Vector + keyword search baseline |
| 4 | RAG answer v0 | Prompt templates, citation enforcement |
| 5 | Personalization v0 | Profiles, checklist exports |
| 6 | Program browser | Program catalog & filters |
| 7 | Safety & feedback | Guardrails, reranker, feedback loop |
| 8 | Beta launch prep | Documentation, evaluation report, pilot testing |

## System Snapshot
- **Frontend**: Next.js + Tailwind
- **Backend**: Node.js (Express, TypeScript)
- **Database**: Postgres + pgvector
- **LLM Stack**: OpenAI-compatible API (future phase)
- **Infra**: Docker Compose for local dev, cloud TBD

## Current Phase
We are focused on scaffolding the repository (frontend, backend, database, infrastructure) with stubbed RAG endpoints that will be implemented in a subsequent phase.

## Local Development
1. Duplicate `.env.example` to `.env` and adjust values as needed (defaults work for local Compose).
2. Build and launch the stack:
   ```bash
   make up
   ```
3. Access the services:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/api/healthz
   - Postgres: localhost:5432 (credentials from `.env`)
   - Adminer: http://localhost:8080 (System: PostgreSQL, Server: `postgres`, Username: `postgres`, Password: `postgres`, Database: `futurenavigator`)

Additional helpers:

```bash
make logs   # Follow container logs
make down   # Stop and remove containers
make psql   # Open a psql shell inside the Postgres container
```

## Next Steps
- Implement Retrieval-Augmented Generation ingestion and QA flows.
- Harden auth, user management, and role-based access for applicants, counselors, and parents.
- Enrich program catalog and checklist intelligence with live data sources.

## Maintainer
Simon
