export interface Profile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  grade_level?: string
  gpa?: number
  gender?: string
  ethnicity?: string
  field_of_interest?: string
  created_at: string
  updated_at: string
}

export interface Scholarship {
  id: string
  name: string
  description: string
  full_description: string
  award_amount?: string
  deadline?: string
  grade_level: string[]
  citizenship: string[]
  gpa_requirement?: number
  gender: string[]
  ethnicity: string[]
  field: string[]
  tags: string[]
  application_url?: string
  created_at: string
  updated_at: string
}

export interface Opportunity {
  id: string
  name: string
  description: string
  full_description: string
  location?: string
  duration?: string
  deadline?: string
  grade_level: string[]
  citizenship: string[]
  gpa_requirement?: number
  field: string[]
  type: string[]
  tags: string[]
  application_url?: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  image_url?: string
  slug: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface UserTracking {
  id: string
  user_id: string
  item_id: string
  item_type: "scholarship" | "opportunity"
  status: "saved" | "applying" | "submitted" | "completed"
  deadline?: string
  notes?: string
  created_at: string
  updated_at: string
}
