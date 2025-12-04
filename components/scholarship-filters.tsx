"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import { useState } from "react"

export function ScholarshipFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedEthnicities, setSelectedEthnicities] = useState<string[]>(
    searchParams.get("ethnicity")?.split(",") || [],
  )

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/scholarships?${params.toString()}`)
  }

  const updateEthnicityFilter = (ethnicity: string, checked: boolean) => {
    let newEthnicities = [...selectedEthnicities]

    if (checked) {
      newEthnicities.push(ethnicity)
    } else {
      newEthnicities = newEthnicities.filter((e) => e !== ethnicity)
    }

    setSelectedEthnicities(newEthnicities)

    const params = new URLSearchParams(searchParams.toString())
    if (newEthnicities.length > 0) {
      params.set("ethnicity", newEthnicities.join(","))
    } else {
      params.delete("ethnicity")
    }

    router.push(`/scholarships?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams()
    const search = searchParams.get("search")
    if (search) {
      params.set("search", search)
    }
    setSelectedEthnicities([])
    router.push(`/scholarships?${params.toString()}`)
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

          {/* Award Amount */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Award Amount</label>
            <Select
              value={searchParams.get("award_amount") || "all"}
              onValueChange={(value) => updateFilter("award_amount", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any Amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Amount</SelectItem>
                <SelectItem value="5000">$5,000+</SelectItem>
                <SelectItem value="2500">$2,500+</SelectItem>
                <SelectItem value="1000">$1,000+</SelectItem>
                <SelectItem value="500">$500+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Gender</label>
            <Select
              value={searchParams.get("gender") || "all"}
              onValueChange={(value) => updateFilter("gender", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Gender</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ethnicity */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Ethnicity</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {[
                "African American",
                "Asian",
                "Hispanic/Latino",
                "Native American",
                "Pacific Islander",
                "White",
                "Mixed Race",
              ].map((ethnicity) => (
                <div key={ethnicity} className="flex items-center space-x-2">
                  <Checkbox
                    id={ethnicity}
                    checked={selectedEthnicities.includes(ethnicity)}
                    onCheckedChange={(checked) => updateEthnicityFilter(ethnicity, checked as boolean)}
                  />
                  <label htmlFor={ethnicity} className="text-sm text-foreground cursor-pointer">
                    {ethnicity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Field */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Field of Study</label>
            <Select value={searchParams.get("field") || "all"} onValueChange={(value) => updateFilter("field", value)}>
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Any Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Field</SelectItem>
                <SelectItem value="STEM">STEM</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Community Service">Community Service</SelectItem>
                <SelectItem value="Athletics">Athletics</SelectItem>
                <SelectItem value="Writing">Writing</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
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

          {/* Award Amount */}
          <div className="flex-1 min-w-max">
            <label className="text-xs font-medium text-foreground mb-1 block">Amount</label>
            <Select
              value={searchParams.get("award_amount") || "all"}
              onValueChange={(value) => updateFilter("award_amount", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary text-xs h-9">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Amount</SelectItem>
                <SelectItem value="5000">$5,000+</SelectItem>
                <SelectItem value="2500">$2,500+</SelectItem>
                <SelectItem value="1000">$1,000+</SelectItem>
                <SelectItem value="500">$500+</SelectItem>
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
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Community Service">Community Service</SelectItem>
                <SelectItem value="Athletics">Athletics</SelectItem>
                <SelectItem value="Writing">Writing</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
