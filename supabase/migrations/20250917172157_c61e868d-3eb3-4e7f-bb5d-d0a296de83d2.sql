-- Create departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('faculty', 'hod', 'principal');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL,
  department_id UUID REFERENCES public.departments(id),
  position TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create faculty self appraisal table
CREATE TABLE public.faculty_self_appraisals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  faculty_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  academic_year TEXT NOT NULL,
  
  -- Basic Information
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  department_id UUID NOT NULL REFERENCES public.departments(id),
  date_of_joining DATE,
  qualification TEXT,
  experience_years INTEGER,
  
  -- Part A: Teaching (out of 300 points)
  courses_taught JSONB DEFAULT '[]'::jsonb,
  total_classes_taken INTEGER DEFAULT 0,
  student_strength INTEGER DEFAULT 0,
  teaching_load_hours DECIMAL DEFAULT 0,
  course_files_prepared INTEGER DEFAULT 0,
  lab_manuals_prepared INTEGER DEFAULT 0,
  question_papers_set INTEGER DEFAULT 0,
  student_feedback_score DECIMAL DEFAULT 0,
  innovative_teaching_methods TEXT,
  online_courses_completed INTEGER DEFAULT 0,
  certifications_obtained TEXT,
  
  -- Part B: Research & Publications (out of 50 points)
  research_papers_published INTEGER DEFAULT 0,
  conferences_attended INTEGER DEFAULT 0,
  books_authored INTEGER DEFAULT 0,
  patents_filed INTEGER DEFAULT 0,
  research_projects INTEGER DEFAULT 0,
  consultancy_projects INTEGER DEFAULT 0,
  phd_guidance INTEGER DEFAULT 0,
  
  -- Part C: Professional Development (out of 15 points)
  workshops_attended INTEGER DEFAULT 0,
  seminars_conducted INTEGER DEFAULT 0,
  professional_memberships TEXT,
  awards_received TEXT,
  
  -- Part D: Administration (out of 10 points)
  administrative_responsibilities TEXT,
  committee_memberships TEXT,
  institutional_activities TEXT,
  
  -- Attachments and signature
  supporting_documents JSONB DEFAULT '[]'::jsonb,
  signature_confirmed BOOLEAN DEFAULT FALSE,
  
  -- Calculated scores
  teaching_score DECIMAL DEFAULT 0,
  research_score DECIMAL DEFAULT 0,
  professional_dev_score DECIMAL DEFAULT 0,
  admin_score DECIMAL DEFAULT 0,
  total_score DECIMAL DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed')),
  submitted_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(faculty_id, academic_year)
);

-- Create HOD performance appraisal table
CREATE TABLE public.hod_performance_appraisals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  faculty_appraisal_id UUID NOT NULL REFERENCES public.faculty_self_appraisals(id) ON DELETE CASCADE,
  hod_id UUID NOT NULL REFERENCES public.profiles(id),
  
  -- HOD Assessment (Maximum 25 points)
  initiative_drive INTEGER DEFAULT 0 CHECK (initiative_drive >= 0 AND initiative_drive <= 25),
  leave_permissions INTEGER DEFAULT 0 CHECK (leave_permissions >= 0 AND leave_permissions <= 25),
  domain_knowledge INTEGER DEFAULT 0 CHECK (domain_knowledge >= 0 AND domain_knowledge <= 25),
  student_mentoring INTEGER DEFAULT 0 CHECK (student_mentoring >= 0 AND student_mentoring <= 25),
  administrative_efficiency INTEGER DEFAULT 0 CHECK (administrative_efficiency >= 0 AND administrative_efficiency <= 25),
  policy_compliance INTEGER DEFAULT 0 CHECK (policy_compliance >= 0 AND policy_compliance <= 25),
  collegiality_teamwork INTEGER DEFAULT 0 CHECK (collegiality_teamwork >= 0 AND collegiality_teamwork <= 25),
  class_control_innovation INTEGER DEFAULT 0 CHECK (class_control_innovation >= 0 AND class_control_innovation <= 25),
  task_completion INTEGER DEFAULT 0 CHECK (task_completion >= 0 AND task_completion <= 25),
  attire_punctuality INTEGER DEFAULT 0 CHECK (attire_punctuality >= 0 AND attire_punctuality <= 25),
  
  show_cause_notices TEXT,
  hod_assessment_score DECIMAL DEFAULT 0,
  
  -- Weighted calculations
  teaching_weighted_score DECIMAL DEFAULT 0,
  research_weighted_score DECIMAL DEFAULT 0,
  professional_dev_weighted_score DECIMAL DEFAULT 0,
  admin_weighted_score DECIMAL DEFAULT 0,
  final_weighted_score DECIMAL DEFAULT 0,
  
  performance_category TEXT CHECK (performance_category IN ('Below Average', 'Average', 'Good', 'Very Good', 'Excellent')),
  suggestions_improvement TEXT,
  
  hod_name TEXT,
  hod_signature_confirmed BOOLEAN DEFAULT FALSE,
  
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted')),
  submitted_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create principal remarks table
CREATE TABLE public.principal_remarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hod_appraisal_id UUID NOT NULL REFERENCES public.hod_performance_appraisals(id) ON DELETE CASCADE,
  principal_id UUID NOT NULL REFERENCES public.profiles(id),
  
  observations_remarks TEXT,
  final_decision TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('appraisal-documents', 'appraisal-documents', false);

-- Enable RLS on all tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty_self_appraisals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hod_performance_appraisals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.principal_remarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for departments (viewable by all authenticated users)
CREATE POLICY "Departments are viewable by authenticated users" ON public.departments
FOR SELECT TO authenticated USING (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "HODs can view faculty in their department" ON public.profiles
FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role = 'hod' 
    AND p.department_id = profiles.department_id
  ) OR auth.uid() = user_id
);

CREATE POLICY "Principals can view all profiles" ON public.profiles
FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role = 'principal'
  ) OR auth.uid() = user_id
);

-- RLS Policies for faculty self appraisals
CREATE POLICY "Faculty can manage their own appraisals" ON public.faculty_self_appraisals
FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.id = faculty_id
  )
);

CREATE POLICY "HODs can view faculty appraisals in their department" ON public.faculty_self_appraisals
FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles hod 
    JOIN public.profiles faculty ON faculty.id = faculty_self_appraisals.faculty_id
    WHERE hod.user_id = auth.uid() 
    AND hod.role = 'hod' 
    AND hod.department_id = faculty.department_id
  )
);

CREATE POLICY "Principals can view all faculty appraisals" ON public.faculty_self_appraisals
FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role = 'principal'
  )
);

-- RLS Policies for HOD performance appraisals
CREATE POLICY "HODs can manage appraisals for their department faculty" ON public.hod_performance_appraisals
FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.id = hod_id
  )
);

CREATE POLICY "Principals can view all HOD appraisals" ON public.hod_performance_appraisals
FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role = 'principal'
  )
);

-- RLS Policies for principal remarks
CREATE POLICY "Principals can manage all remarks" ON public.principal_remarks
FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.role = 'principal'
  )
);

-- Storage policies for documents
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'appraisal-documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view documents in their department" ON storage.objects
FOR SELECT TO authenticated USING (
  bucket_id = 'appraisal-documents' AND (
    auth.uid()::text = (storage.foldername(name))[1] OR
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() 
      AND p.role IN ('hod', 'principal')
    )
  )
);

-- Insert sample departments
INSERT INTO public.departments (name, code) VALUES 
('Computer Science & Engineering', 'CSE'),
('Computer Science & Engineering (Artificial Intelligence & Machine Learning)', 'CSM'),
('Computer Science & Engineering (Data Science)', 'CSD'),
('Information Technology', 'IT'),
('Electronics & Communication Engineering', 'ECE'),
('Electrical & Electronics Engineering', 'EEE'),
('Mechanical Engineering', 'MECH'),
('Civil Engineering', 'CIVIL');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faculty_self_appraisals_updated_at BEFORE UPDATE ON public.faculty_self_appraisals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hod_performance_appraisals_updated_at BEFORE UPDATE ON public.hod_performance_appraisals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();