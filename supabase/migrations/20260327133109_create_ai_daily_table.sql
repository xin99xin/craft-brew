/*
  # Create AI Daily table

  1. New Tables
    - `ai_daily`
      - `id` (uuid, primary key) - Unique identifier for each article
      - `title` (text, not null) - Title of the AI daily article
      - `date` (date, not null) - Publication date
      - `content` (text, not null) - Article content
      - `created_at` (timestamptz) - Timestamp when the article was created
      - `updated_at` (timestamptz) - Timestamp when the article was last updated

  2. Security
    - Enable RLS on `ai_daily` table
    - Add policy for public read access (articles are publicly viewable)
    - Add policy for authenticated users to create articles
    - Add policy for authenticated users to update their own articles
*/

CREATE TABLE IF NOT EXISTS ai_daily (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_daily ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view AI daily articles"
  ON ai_daily
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert AI daily articles"
  ON ai_daily
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update AI daily articles"
  ON ai_daily
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete AI daily articles"
  ON ai_daily
  FOR DELETE
  TO authenticated
  USING (true);