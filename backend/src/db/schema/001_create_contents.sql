-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Contents table
CREATE TABLE IF NOT EXISTS contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding VECTOR(768),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for semantic search (Disabled for small datasets to avoid low recall)
-- CREATE INDEX IF NOT EXISTS contents_embedding_idx
-- ON contents
-- USING ivfflat (embedding vector_cosine_ops)
-- WITH (lists = 100);
