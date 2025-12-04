import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ScholarshipSearch } from "@/components/scholarship-search"
import { ScholarshipFilters } from "@/components/scholarship-filters"
import { ScholarshipGrid } from "@/components/scholarship-grid"
import { Suspense } from "react"

const mockScholarships = [
  {
    id: 1,
    name: "Excellence in STEM",
    description: "Merit-based scholarship for outstanding STEM students",
    award_amount: 5000,
    gpa_requirement: 3.5,
    grade_level: "9th",
    citizenship: "US",
    field: "STEM",
    gender: "All",
    ethnicity: "All",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Future Leaders Scholarship",
    description: "For students demonstrating leadership and academic excellence",
    award_amount: 3000,
    gpa_requirement: 3.0,
    grade_level: "10th",
    citizenship: "US",
    field: "Business",
    gender: "All",
    ethnicity: "All",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Arts & Humanities Award",
    description: "Supporting talented young artists and writers",
    award_amount: 2500,
    gpa_requirement: 2.8,
    grade_level: "Middle School",
    citizenship: "US",
    field: "Arts",
    gender: "All",
    ethnicity: "All",
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Healthcare Careers Foundation",
    description: "For students interested in medical and healthcare fields",
    award_amount: 4000,
    gpa_requirement: 3.3,
    grade_level: "9th",
    citizenship: "US",
    field: "Healthcare",
    gender: "All",
    ethnicity: "All",
    created_at: new Date().toISOString(),
  },
]

interface SearchParams {
  search?: string
  grade_level?: string
  citizenship?: string
  gpa?: string
  award_amount?: string
  gender?: string
  ethnicity?: string
  field?: string
}

export default async function ScholarshipsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  let scholarships = [...mockScholarships]

  if (params.search) {
    const searchTerm = params.search.toLowerCase()
    scholarships = scholarships.filter((s) => s.name.toLowerCase().includes(searchTerm))
  }

  if (params.grade_level) {
    scholarships = scholarships.filter((s) => s.grade_level === params.grade_level)
  }

  if (params.citizenship) {
    scholarships = scholarships.filter((s) => s.citizenship === params.citizenship)
  }

  if (params.gpa) {
    const gpaValue = Number.parseFloat(params.gpa)
    scholarships = scholarships.filter((s) => s.gpa_requirement <= gpaValue)
  }

  if (params.field) {
    scholarships = scholarships.filter((s) => s.field === params.field)
  }

  if (params.award_amount) {
    const amount = Number.parseInt(params.award_amount)
    scholarships = scholarships.filter((s) => s.award_amount >= amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white">
      <Section className="pt-8">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4 text-balance">SCHOLARSHIPS</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover merit-based scholarships designed specifically for underclassmen. No application fees, no
              attendance fees - just recognition for your achievements.
            </p>
          </div>

          <div className="mb-8">
            <ScholarshipSearch />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ScholarshipFilters />
              </div>
            </div>

            <div className="lg:col-span-3">
              {scholarships.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
                  <p className="text-muted-foreground">No scholarships found matching your criteria.</p>
                </div>
              ) : (
                <Suspense fallback={<div className="text-center py-8">Loading scholarships...</div>}>
                  <ScholarshipGrid scholarships={scholarships} />
                </Suspense>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
