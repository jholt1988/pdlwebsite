/*
  # Create rental applications table

  1. New Tables
    - `rental_applications`
      - `id` (uuid, primary key)
      - Personal information fields
      - Rental preferences
      - Employment information
      - References
      - Document URLs
      - Application status and timestamps

  2. Security
    - Enable RLS on `rental_applications` table
    - Add policies for application submission and admin access
*/

CREATE TABLE IF NOT EXISTS rental_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Personal Information
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date_of_birth date NOT NULL,
  ssn_last_four text NOT NULL,
  
  -- Rental Preferences
  property_type text NOT NULL,
  bedrooms text NOT NULL,
  max_rent numeric(10,2) NOT NULL,
  move_in_date date NOT NULL,
  lease_term text NOT NULL,
  pets text,
  
  -- Employment Information
  employer text NOT NULL,
  position text NOT NULL,
  monthly_income numeric(10,2) NOT NULL,
  employment_length text NOT NULL,
  additional_income numeric(10,2) DEFAULT 0,
  
  -- References
  previous_landlord text,
  landlord_phone text,
  reference1_name text NOT NULL,
  reference1_phone text NOT NULL,
  reference2_name text,
  reference2_phone text,
  
  -- Documents
  id_document_url text,
  income_proof_url text,
  additional_docs_url text,
  
  -- Application Status
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected', 'withdrawn')),
  
  -- Timestamps
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rental_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit applications"
  ON rental_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can view all applications"
  ON rental_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

CREATE POLICY "Admins can update applications"
  ON rental_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_rental_applications_email ON rental_applications(email);
CREATE INDEX idx_rental_applications_status ON rental_applications(status);
CREATE INDEX idx_rental_applications_submitted_at ON rental_applications(submitted_at);
CREATE INDEX idx_rental_applications_property_type ON rental_applications(property_type);

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('application-documents', 'application-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Authenticated users can upload application documents"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'application-documents');

CREATE POLICY "Admins can view application documents"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'application-documents' AND
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );