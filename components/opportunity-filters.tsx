"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

export function OpportunityFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/opportunities?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams()
    const search = searchParams.get("search")
    if (search) {
      params.set("search", search)
    }
    router.push(`/opportunities?${params.toString()}`)
  }

  const hasActiveFilters = Array.from(searchParams.keys()).some((key) => key !== "search")

  return (
    <div className="space-y-4">
      {/* Desktop Filters */}
      <Card className="border-primary/20 hidden lg:block">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-primary">Search Filters</CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Grade Level */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Grade Level</label>
            <Select
              value={searchParams.get("grade_level") || "all"}
              onValueChange={(value) => updateFilter("grade_level", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Grade</SelectItem>
                <SelectItem value="middle_school">Middle School</SelectItem>
                <SelectItem value="9th">9th Grade</SelectItem>
                <SelectItem value="10th">10th Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Citizenship */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Citizenship</label>
            <Select
              value={searchParams.get("citizenship") || "all"}
              onValueChange={(value) => updateFilter("citizenship", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Status</SelectItem>
                <SelectItem value="US Citizen">US Citizen</SelectItem>
                <SelectItem value="Permanent Resident">Permanent Resident</SelectItem>
                <SelectItem value="International">International</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* GPA */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Minimum GPA</label>
            <Select value={searchParams.get("gpa") || "all"} onValueChange={(value) => updateFilter("gpa", value)}>
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any GPA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any GPA</SelectItem>
                <SelectItem value="4.0">4.0</SelectItem>
                <SelectItem value="3.8">3.8+</SelectItem>
                <SelectItem value="3.5">3.5+</SelectItem>
                <SelectItem value="3.0">3.0+</SelectItem>
                <SelectItem value="2.5">2.5+</SelectItem>
                <SelectItem value="2.0">2.0+</SelectItem>
                <SelectItem value="0.0">0.0+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
            <Select
              value={searchParams.get("location") || "all"}
              onValueChange={(value) => updateFilter("location", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Location</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Texas">Texas</SelectItem>
                <SelectItem value="Florida">Florida</SelectItem>
                <SelectItem value="Washington">Washington</SelectItem>
                <SelectItem value="National">National</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Field */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Field</label>
            <Select value={searchParams.get("field") || "all"} onValueChange={(value) => updateFilter("field", value)}>
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Field</SelectItem>
                <SelectItem value="STEM">STEM</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Environmental Science">Environmental Science</SelectItem>
                <SelectItem value="Medicine">Medicine</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Type</label>
            <Select value={searchParams.get("type") || "all"} onValueChange={(value) => updateFilter("type", value)}>
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Type</SelectItem>
                <SelectItem value="Summer Program">Summer Program</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                <SelectItem value="Research Program">Research Program</SelectItem>
                <SelectItem value="Field Study">Field Study</SelectItem>
                <SelectItem value="Competition">Competition</SelectItem>
                <SelectItem value="Mentorship">Mentorship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Duration</label>
            <Select
              value={searchParams.get("duration") || "all"}
              onValueChange={(value) => updateFilter("duration", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="1 week">1 Week</SelectItem>
                <SelectItem value="2 weeks">2 Weeks</SelectItem>
                <SelectItem value="1 month">1 Month</SelectItem>
                <SelectItem value="2 months">2 Months</SelectItem>
                <SelectItem value="3 months">3 Months</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
                <SelectItem value="Academic Year">Academic Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Grade Level */}
          <div className="flex-1 min-w-max">
            <label className="text-xs font-medium text-foreground mb-1 block">Grade</label>
            <Select
              value={searchParams.get("grade_level") || "all"}
              onValueChange={(value) => updateFilter("grade_level", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary text-xs h-9">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Grade</SelectItem>
                <SelectItem value="middle_school">Middle School</SelectItem>
                <SelectItem value="9th">9th Grade</SelectItem>
                <SelectItem value="10th">10th Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Citizenship */}
          <div className="flex-1 min-w-max">
            <label className="text-xs font-medium text-foreground mb-1 block">Citizenship</label>
            <Select
              value={searchParams.get("citizenship") || "all"}
              onValueChange={(value) => updateFilter("citizenship", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary text-xs h-9">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Status</SelectItem>
                <SelectItem value="US Citizen">US Citizen</SelectItem>
                <SelectItem value="Permanent Resident">Permanent Resident</SelectItem>
                <SelectItem value="International">International</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* GPA */}
          <div className="flex-1 min-w-max">
            <label className="text-xs font-medium text-foreground mb-1 block">GPA</label>
            <Select value={searchParams.get("gpa") || "all"} onValueChange={(value) => updateFilter("gpa", value)}>
              <SelectTrigger className="border-primary/30 focus:border-primary text-xs h-9">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any GPA</SelectItem>
                <SelectItem value="4.0">4.0</SelectItem>
                <SelectItem value="3.8">3.8+</SelectItem>
                <SelectItem value="3.5">3.5+</SelectItem>
                <SelectItem value="3.0">3.0+</SelectItem>
                <SelectItem value="2.5">2.5+</SelectItem>
                <SelectItem value="2.0">2.0+</SelectItem>
                <SelectItem value="0.0">0.0+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="flex-1 min-w-max">
            <label className="text-xs font-medium text-foreground mb-1 block">Location</label>
            <Select
              value={searchParams.get("location") || "all"}
              onValueChange={(value) => updateFilter("location", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary text-xs h-9">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Location</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Texas">Texas</SelectItem>
                <SelectItem value="Florida">Florida</SelectItem>
                <SelectItem value="Washington">Washington</SelectItem>
                <SelectItem value="National">National</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Field */}
          <div className="flex-1 min-w-max">
            <label className="text-xs font-medium text-foreground mb-1 block">Field</label>
            <Select value={searchParams.get("field") || "all"} onValueChange={(value) => updateFilter("field", value)}>
              <SelectTrigger className="border-primary/30 focus:border-primary text-xs h-9">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Field</SelectItem>
                <SelectItem value="STEM">STEM</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Environmental Science">Environmental Science</SelectItem>
                <SelectItem value="Medicine">Medicine</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div className="flex-1 min-w-max">
            <label className="text-xs font-medium text-foreground mb-1 block">Type</label>
            <Select value={searchParams.get("type") || "all"} onValueChange={(value) => updateFilter("type", value)}>
              <SelectTrigger className="border-primary/30 focus:border-primary text-xs h-9">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Type</SelectItem>
                <SelectItem value="Summer Program">Summer Program</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                <SelectItem value="Research Program">Research Program</SelectItem>
                <SelectItem value="Field Study">Field Study</SelectItem>
                <SelectItem value="Competition">Competition</SelectItem>
                <SelectItem value="Mentorship">Mentorship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="flex-1 min-w-max">
            <label className="text-xs font-medium text-foreground mb-1 block">Duration</label>
            <Select
              value={searchParams.get("duration") || "all"}
              onValueChange={(value) => updateFilter("duration", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary text-xs h-9">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="1 week">1 Week</SelectItem>
                <SelectItem value="2 weeks">2 Weeks</SelectItem>
                <SelectItem value="1 month">1 Month</SelectItem>
                <SelectItem value="2 months">2 Months</SelectItem>
                <SelectItem value="3 months">3 Months</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
                <SelectItem value="Academic Year">Academic Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
