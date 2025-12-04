import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Briefcase } from "lucide-react"
import type { Opportunity } from "@/lib/types"

interface OpportunityGridProps {
  opportunities: Opportunity[]
}

export function OpportunityGrid({ opportunities }: OpportunityGridProps) {
  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No opportunities found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters to find more opportunities.
          </p>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          >
            <Link href="/opportunities">Clear Filters</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Found {opportunities.length} opportunit{opportunities.length !== 1 ? "ies" : "y"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opportunity) => (
          <Card
            key={opportunity.id}
            className="group hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40 bg-white"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-primary group-hover:text-primary-dark transition-colors line-clamp-2">
                  {opportunity.name}
                </CardTitle>
                {opportunity.duration && (
                  <div className="flex items-center text-accent-dark font-semibold text-sm bg-accent-light px-2 py-1 rounded-md ml-2 flex-shrink-0">
                    <Clock className="h-3 w-3 mr-1" />
                    {opportunity.duration}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm line-clamp-3 text-pretty">{opportunity.description}</p>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {opportunity.location && (
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {opportunity.location}
                  </div>
                )}
                {opportunity.deadline && (
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(opportunity.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Tags - CHANGE: Added null/undefined check */}
              {opportunity.tags && opportunity.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-primary-light text-primary border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {opportunity.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                      +{opportunity.tags.length - 3} more
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
                  <Link href={`/opportunities/${opportunity.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
