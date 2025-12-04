-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  grade_level TEXT CHECK (grade_level IN ('6th', '7th', '8th', '9th', '10th')),
  gpa DECIMAL(3,2),
  gender TEXT,
  ethnicity TEXT,
  field_of_interest TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scholarships table
CREATE TABLE IF NOT EXISTS public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  award_amount TEXT,
  deadline DATE,
  grade_level TEXT[] DEFAULT '{}',
  citizenship TEXT[] DEFAULT '{}',
  gpa_requirement DECIMAL(3,2),
  gender TEXT[] DEFAULT '{}',
  ethnicity TEXT[] DEFAULT '{}',
  field TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  application_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create opportunities table
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  location TEXT,
  duration TEXT,
  deadline DATE,
  grade_level TEXT[] DEFAULT '{}',
  citizenship TEXT[] DEFAULT '{}',
  gpa_requirement DECIMAL(3,2),
  field TEXT[] DEFAULT '{}',
  type TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  application_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user tracking table for saved scholarships/opportunities
CREATE TABLE IF NOT EXISTS public.user_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('scholarship', 'opportunity')),
  status TEXT DEFAULT 'saved' CHECK (status IN ('saved', 'applying', 'submitted', 'completed')),
  deadline DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tracking ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Scholarships policies (public read, admin write)
CREATE POLICY "scholarships_select_all" ON public.scholarships FOR SELECT TO PUBLIC USING (true);

-- Opportunities policies (public read, admin write)
CREATE POLICY "opportunities_select_all" ON public.opportunities FOR SELECT TO PUBLIC USING (true);

-- Blog posts policies (public read for published posts)
CREATE POLICY "blog_posts_select_published" ON public.blog_posts FOR SELECT TO PUBLIC USING (published = true);

-- User tracking policies
CREATE POLICY "user_tracking_select_own" ON public.user_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_tracking_insert_own" ON public.user_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_tracking_update_own" ON public.user_tracking FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "user_tracking_delete_own" ON public.user_tracking FOR DELETE USING (auth.uid() = user_id);
