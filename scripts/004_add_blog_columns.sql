-- Add missing columns to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS featured_image TEXT,
ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'MERITBASED Team',
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Scholarships',
ADD COLUMN IF NOT EXISTS read_time INTEGER DEFAULT 5;
