import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, GraduationCap } from "lucide-react"
import type { Scholarship } from "@/lib/types"

interface ScholarshipGridProps {
  scholarships: Scholarship[]
}

export function ScholarshipGrid({ scholarships }: ScholarshipGridProps) {
  if (scholarships.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No scholarships found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters to find more opportunities.
          </p>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          >
            <Link href="/scholarships">Clear Filters</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Found {scholarships.length} scholarship{scholarships.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarships.map((scholarship) => (
          <Card
            key={scholarship.id}
            className="group hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40 bg-white"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-primary group-hover:text-primary-dark transition-colors line-clamp-2">
                  {scholarship.name}
                </CardTitle>
                {scholarship.award_amount && (
                  <div className="flex items-center text-accent-dark font-semibold text-sm bg-accent-light px-2 py-1 rounded-md ml-2 flex-shrink-0">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {scholarship.award_amount}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm line-clamp-3 text-pretty">{scholarship.description}</p>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {scholarship.deadline && (
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </div>
                )}
                {scholarship.gpa_requirement && (
                  <div className="flex items-center">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {scholarship.gpa_requirement}+ GPA
                  </div>
                )}
              </div>

              {/* Tags - CHANGE: Added null/undefined check */}
              {scholarship.tags && scholarship.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {scholarship.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-primary-light text-primary border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {scholarship.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                      +{scholarship.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary-dark text-white transition-all duration-200 group-hover:scale-[1.02]"
                >
                  <Link href={`/scholarships/${scholarship.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
