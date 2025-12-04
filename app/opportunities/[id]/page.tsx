"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ArrowLeft, Calendar, Clock, ExternalLink, GraduationCap, Users, Globe, Heart, MapPin } from "lucide-react"
import { opportunitiesMockData } from "@/lib/mock-data"
import { useParams } from "next/navigation"

export default function OpportunityDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [opportunity, setOpportunity] = useState<any>(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const found = opportunitiesMockData.find((o) => o.id === id)
    if (found) {
      setOpportunity(found)
      const currentUser = JSON.parse(localStorage.getItem("meritbased_currentUser") || "{}")
      const userKey = currentUser.email ? currentUser.email.replace(/[@.]/g, "_") : ""
      const saved = JSON.parse(localStorage.getItem(`meritbased_savedOpportunities_${userKey}`) || "[]")
      setIsSaved(saved.some((o: any) => o.id === id))
    }
  }, [id])

  const handleSave = () => {
    const currentUser = JSON.parse(localStorage.getItem("meritbased_currentUser") || "{}")
    if (!currentUser.email) {
      alert("Please sign in to save opportunities")
      return
    }

    const userKey = currentUser.email.replace(/[@.]/g, "_")
    const saved = JSON.parse(localStorage.getItem(`meritbased_savedOpportunities_${userKey}`) || "[]")
    if (isSaved) {
      const filtered = saved.filter((o: any) => o.id !== opportunity.id)
      localStorage.setItem(`meritbased_savedOpportunities_${userKey}`, JSON.stringify(filtered))
    } else {
      saved.push({ ...opportunity, id: opportunity.id })
      localStorage.setItem(`meritbased_savedOpportunities_${userKey}`, JSON.stringify(saved))
    }
    setIsSaved(!isSaved)
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white flex items-center justify-center">
        <Container>
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Opportunity not found</p>
            <Button asChild className="mt-4">
              <Link href="/opportunities">Back to Opportunities</Link>
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white">
      <Section className="pt-8">
        <Container>
          {/* Back Button */}
          <div className="mb-6">
            <Button asChild variant="ghost" className="text-primary hover:text-primary-dark">
              <Link href="/opportunities">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Opportunities
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl sm:text-3xl font-bold text-primary mb-2 text-balance">
                        {opportunity.name}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {opportunity.location && (
                          <div className="flex items-center text-muted-foreground bg-muted px-3 py-1 rounded-lg">
                            <MapPin className="h-4 w-4 mr-1" />
                            {opportunity.location}
                          </div>
                        )}
                        {opportunity.duration && (
                          <div className="flex items-center text-accent-dark font-semibold bg-accent-light px-3 py-1 rounded-lg">
                            <Clock className="h-4 w-4 mr-1" />
                            {opportunity.duration}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Description */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">About This Opportunity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-muted-foreground leading-relaxed text-pretty whitespace-pre-line">
                      {opportunity.full_description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Application Button */}
              {opportunity.application_url && (
                <Card className="border-accent/30 bg-accent-light/50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Apply?</h3>
                      <p className="text-muted-foreground mb-4">
                        Click below to visit the official application page for this opportunity.
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <Link href={opportunity.application_url} target="_blank" rel="noopener noreferrer">
                          Apply Now
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {opportunity.deadline && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-accent-dark" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Deadline</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(opportunity.deadline).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {opportunity.gpa_requirement && (
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-5 w-5 text-accent-dark" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Minimum GPA</p>
                        <p className="text-sm text-muted-foreground">{opportunity.gpa_requirement}</p>
                      </div>
                    </div>
                  )}

                  {opportunity.grade_level.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-accent-dark mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Eligible Grades</p>
                        <p className="text-sm text-muted-foreground">{opportunity.grade_level.join(", ")}</p>
                      </div>
                    </div>
                  )}

                  {opportunity.citizenship.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-accent-dark mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Citizenship</p>
                        <p className="text-sm text-muted-foreground">{opportunity.citizenship.join(", ")}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              {opportunity.tags.length > 0 && (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-primary-light text-primary border-primary/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Fields and Types */}
              <div className="space-y-4">
                {opportunity.field.length > 0 && (
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.field.map((field: string) => (
                          <Badge
                            key={field}
                            variant="outline"
                            className="border-accent text-accent-dark hover:bg-accent-light"
                          >
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {opportunity.type.length > 0 && (
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.type.map((type: string) => (
                          <Badge
                            key={type}
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary-light"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Save Button */}
              <Card className="border-primary/20 bg-primary-light/50">
                <CardContent className="pt-6">
                  <Button
                    onClick={handleSave}
                    variant="outline"
                    className={`w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent transition-colors ${
                      isSaved ? "bg-primary text-white" : ""
                    }`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Saved" : "Save Opportunity"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Sign in to save and track this opportunity
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
