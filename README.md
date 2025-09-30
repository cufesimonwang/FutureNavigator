# FutureNavigator — dev_simon

## 1. Project Overview

**FutureNavigator** is a Retrieval-Augmented Generation (RAG) chatbot that guides students through the university application process.  
It provides **accurate, personalized, and cited** information about programs, deadlines, scholarships, and requirements, while helping students plan their application journey.

## 2. Value Proposition

- Centralizes scattered information into one assistant.
- Provides provenance-backed answers to reduce misinformation.
- Generates personalized checklists and timelines based on user profile.
- Helps students avoid missing deadlines and incomplete documents.

## 3. System Architecture

```mermaid
flowchart LR
U[User (Web/Chat)] --> GW[API Gateway]
GW --> AUTH[Auth & Profiles]
GW --> ORCH[Agent Orchestrator]
ORCH -->|Query| RETRIEVE[Retrieval Layer]
RETRIEVE -->|Vector| VDB[(Vector DB)]
RETRIEVE -->|Structured| KG[(Program DB / Tables)]
RETRIEVE -->|Unstructured| DOCS[(Curated PDFs, Web Snapshots)]
ORCH --> LLM[LLM (RAG w/ Re-Ranker)]
LLM --> CITE[Citation Builder]
ORCH --> TASKS[Planner & Checklist Engine]
AUTH --> STORE[(Postgres)]
TASKS --> STORE
VDB --> INGEST[Ingestion Pipeline]
DOCS --> INGEST
KG --> INGEST
```

## 4. RAG Pipeline

- **Ingestion**: PDF → chunking → metadata → deduplication → PII scrubbing.
- **Indexing**: Dense embeddings + BM25 hybrid retrieval.
- **Query Understanding**: Intent classification + entity extraction.
- **Retrieval**: Hybrid dense/sparse search + reranker.
- **Answer Generation**: Citation-based LLM responses.
- **Feedback**: User ratings → retriever tuning.

## 5. Features

- Program search with filters (degree, country, tuition).
- Q&A for requirements & deadlines with citations.
- Personalized checklist generator (CSV/PDF/ICS export).
- Scholarship finder and matcher.
- Draft helpers (emails, SOP outlines).

## 6. Tech Stack

- **Frontend**: Next.js + Tailwind
- **Backend**: Node.js (Fastify/Express)
- **DB**: Postgres
- **Vector DB**: pgvector / Pinecone / Qdrant
- **LLM**: OpenAI-compatible API + reranker
- **Infra**: Vercel + Railway

## 7. Data Model

- `user(id, profile)`
- `school(id, name, country)`
- `program(id, school_id, degree, deadlines_json)`
- `doc(id, source_url, fetched_at, text_meta_json)`
- `embedding(id, doc_id, chunk_id, vector)`
- `plan(id, user_id, checklist_json)`

## 8. API Sketch

- `POST /api/qa` → {query} → {answer, citations}
- `GET /api/programs` → filters → {results}
- `POST /api/plan` → create/update user plan

## 9. Security & Privacy

- Minimal PII storage.
- Strip PII from indexed documents.
- Prompt-injection and jailbreak guardrails.

## 10. Evaluation Metrics

- **IR**: nDCG@k, Recall, MRR.
- **Answer Quality**: Human-rated helpfulness & citation accuracy.
- **Performance**: Latency (p95) + hallucination rate.

## 11. Eight-Week Roadmap

| Week | Milestone          | Deliverables                            | Acceptance Criteria     |
| ---- | ------------------ | --------------------------------------- | ----------------------- |
| 1    | Repo & Infra Setup | CI/CD, `.env.example`, health check API | CI green, lint pass     |
| 2    | Ingestion v0       | PDF → text + metadata                   | Ingest 50 docs          |
| 3    | Retrieval v0       | Embeddings + BM25 hybrid                | Top-k relevant chunks   |
| 4    | RAG Answer v0      | Prompt templates + citations            | Answers w/ ≥2 citations |
| 5    | Personalization v0 | User profiles + checklist export        | Timeline per user       |
| 6    | Program Browser    | `/programs` endpoint + filters          | Query <2s latency       |
| 7    | Safety & Feedback  | Reranker + guardrails + feedback loop   | nDCG +15%               |
| 8    | Beta Launch        | Docs, demo, evaluation report           | Beta test w/ 5 users    |

## 12. License

MIT License. Maintainer: Simon.
