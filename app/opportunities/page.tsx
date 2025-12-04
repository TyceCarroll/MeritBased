import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { OpportunitySearch } from "@/components/opportunity-search"
import { OpportunityFilters } from "@/components/opportunity-filters"
import { OpportunityGrid } from "@/components/opportunity-grid"
import { Suspense } from "react"

const mockOpportunities = [
  {
    id: 1,
    name: "Summer STEM Internship Program",
    description: "Hands-on internship experience in technology and engineering",
    location: "New York, NY",
    grade_level: "9th",
    citizenship: "US",
    gpa_requirement: 3.0,
    field: "STEM",
    type: "Internship",
    duration: "8 weeks",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Youth Leadership Summit",
    description: "Develop leadership skills through workshops and networking",
    location: "Chicago, IL",
    grade_level: "10th",
    citizenship: "US",
    gpa_requirement: 2.8,
    field: "Business",
    type: "Program",
    duration: "3 days",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Young Writers Workshop",
    description: "Creative writing program for aspiring authors",
    location: "Los Angeles, CA",
    grade_level: "Middle School",
    citizenship: "US",
    gpa_requirement: 2.5,
    field: "Arts",
    type: "Workshop",
    duration: "6 weeks",
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Healthcare Shadowing Experience",
    description: "Shadow healthcare professionals in various medical fields",
    location: "Boston, MA",
    grade_level: "9th",
    citizenship: "US",
    gpa_requirement: 3.2,
    field: "Healthcare",
    type: "Shadowing",
    duration: "4 weeks",
    created_at: new Date().toISOString(),
  },
]

interface SearchParams {
  search?: string
  grade_level?: string
  citizenship?: string
  gpa?: string
  location?: string
  field?: string
  type?: string
  duration?: string
}

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  let opportunities = [...mockOpportunities]

  if (params.search) {
    const searchTerm = params.search.toLowerCase()
    opportunities = opportunities.filter((o) => o.name.toLowerCase().includes(searchTerm))
  }

  if (params.grade_level) {
    opportunities = opportunities.filter((o) => o.grade_level === params.grade_level)
  }

  if (params.citizenship) {
    opportunities = opportunities.filter((o) => o.citizenship === params.citizenship)
  }

  if (params.gpa) {
    const gpaValue = Number.parseFloat(params.gpa)
    opportunities = opportunities.filter((o) => o.gpa_requirement <= gpaValue)
  }

  if (params.location) {
    opportunities = opportunities.filter((o) => o.location.toLowerCase().includes(params.location.toLowerCase()))
  }

  if (params.field) {
    opportunities = opportunities.filter((o) => o.field === params.field)
  }

  if (params.type) {
    opportunities = opportunities.filter((o) => o.type === params.type)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white">
      <Section className="pt-8">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4 text-balance">OPPORTUNITIES</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore hands-on learning experiences, internships, and programs designed for underclassmen. No fees to
              apply or attend - just amazing opportunities to grow.
            </p>
          </div>

          <div className="mb-8">
            <OpportunitySearch />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OpportunityFilters />
              </div>
            </div>

            <div className="lg:col-span-3">
              {opportunities.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
                  <p className="text-muted-foreground">No opportunities found matching your criteria.</p>
                </div>
              ) : (
                <Suspense fallback={<div className="text-center py-8">Loading opportunities...</div>}>
                  <OpportunityGrid opportunities={opportunities} />
                </Suspense>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
