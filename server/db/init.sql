-- Delete schema for init the db
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Install extension for generating uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tables of our db
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add index on the user_id in tasks
CREATE INDEX idx_tasks_user_id ON tasks(user_id);

-- Trigger for auto update of the updated_at field
CREATE OR REPLACE FUNCTION update_task_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_task_updated_at BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE PROCEDURE update_task_updated_at();
