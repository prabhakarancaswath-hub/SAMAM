/*
# Create TNEA Colleges table

1. New Tables
- `tnea_colleges` — stores 387 engineering colleges from the official TNEA 2021 information booklet
  - `id` (serial, primary key)
  - `tnea_code` (text, unique) — the official 4-digit TNEA college code
  - `college_name` (text) — full college name
  - `city` (text) — district/city where the college is located
  - `autonomous` (text) — "Yes" or "No"
  - `hostel` (text) — "Yes" or "No" for hostel availability
  - `transport` (text) — "Yes" or "No" for transport facility
  - `branches` (jsonb) — array of {code, name, intake} objects for each branch offered
  - `source_url` (text) — link to the official TNEA PDF the data was extracted from
  - `created_at` (timestamp)

2. Security
- Enable RLS on `tnea_colleges`.
- Public read access (TO anon, authenticated) since this is reference data with no user accounts.
- No insert/update/delete from the frontend — data is managed via migrations only.

3. Notes
- Data source: https://static.tneaonline.org/docs/Information_About_Colleges.pdf?t=1640044800060
- This is a no-auth app; all data is intentionally public/shared reference data.
*/

CREATE TABLE IF NOT EXISTS tnea_colleges (
  id serial PRIMARY KEY,
  tnea_code text UNIQUE NOT NULL,
  college_name text NOT NULL,
  city text DEFAULT '',
  autonomous text DEFAULT 'No',
  hostel text DEFAULT 'No',
  transport text DEFAULT 'No',
  branches jsonb DEFAULT '[]'::jsonb,
  source_url text DEFAULT 'https://static.tneaonline.org/docs/Information_About_Colleges.pdf?t=1640044800060',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tnea_colleges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_tnea_colleges" ON tnea_colleges;
CREATE POLICY "anon_select_tnea_colleges"
ON tnea_colleges FOR SELECT
TO anon, authenticated USING (true);