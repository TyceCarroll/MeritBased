"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ArrowLeft, Calendar, DollarSign, ExternalLink, GraduationCap, Users, Globe, Heart } from "lucide-react"
import { scholarshipsMockData } from "@/lib/mock-data"
import { useParams } from "next/navigation"

// Helper function to safely get the current user and their unique key
const getCurrentUserAndKey = () => {
  const currentUser = JSON.parse(localStorage.getItem("meritbased_currentUser") || "{}")
  // Check if email exists before attempting to replace properties
  if (currentUser.email) {
    const userKey = currentUser.email.replace(/[@.]/g, "_")
    return { currentUser, userKey }
  }
  return { currentUser: {}, userKey: null }
}

export default function ScholarshipDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [scholarship, setScholarship] = useState<any>(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const found = scholarshipsMockData.find((s) => s.id === id)
    if (found) {
      setScholarship(found)
      
      // Check for userKey before proceeding with localStorage access
      const { userKey } = getCurrentUserAndKey()
      
      if (userKey) {
        const saved = JSON.parse(localStorage.getItem(`meritbased_savedScholarships_${userKey}`) || "[]")
        setIsSaved(saved.some((s: any) => s.id === id))
      } else {
        // If there's no user logged in, ensure isSaved is false
        setIsSaved(false);
      }
    }
  }, [id])

  const handleSave = () => {
    const { userKey } = getCurrentUserAndKey()
    
    // Check for valid user email/key before proceeding
    if (!userKey) {
      alert("Please sign in to save scholarships")
      return
    }

    const saved = JSON.parse(localStorage.getItem(`meritbased_savedScholarships_${userKey}`) || "[]")
    if (isSaved) {
      const filtered = saved.filter((s: any) => s.id !== scholarship.id)
      localStorage.setItem(`meritbased_savedScholarships_${userKey}`, JSON.stringify(filtered))
    } else {
      // Ensure scholarship object exists before saving
      if (scholarship) {
          saved.push({ ...scholarship, id: scholarship.id })
          localStorage.setItem(`meritbased_savedScholarships_${userKey}`, JSON.stringify(saved))
      }
    }
    setIsSaved(!isSaved)
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white flex items-center justify-center">
        <Container>
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Scholarship not found</p>
            <Button asChild className="mt-4">
              <Link href="/scholarships">Back to Scholarships</Link>
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
              <Link href="/scholarships">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Scholarships
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
                        {scholarship.name}
                      </CardTitle>
                      {scholarship.award_amount && (
                        <div className="flex items-center text-accent-dark font-bold text-xl bg-accent-light px-3 py-2 rounded-lg inline-flex">
                          <DollarSign className="h-5 w-5 mr-1" />
                          {scholarship.award_amount}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Description */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">About This Scholarship</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-muted-foreground leading-relaxed text-pretty whitespace-pre-line">
                      {scholarship.full_description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Application Button */}
              {scholarship.application_url && (
                <Card className="border-accent/30 bg-accent-light/50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Apply?</h3>
                      <p className="text-muted-foreground mb-4">
                        Click below to visit the official application page for this scholarship.
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <Link href={scholarship.application_url} target="_blank" rel="noopener noreferrer">
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
                  {scholarship.deadline && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-accent-dark" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Deadline</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(scholarship.deadline).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {scholarship.gpa_requirement && (
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-5 w-5 text-accent-dark" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Minimum GPA</p>
                        <p className="text-sm text-muted-foreground">{scholarship.gpa_requirement}</p>
                      </div>
                    </div>
                  )}

                  {scholarship.grade_level.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-accent-dark mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Eligible Grades</p>
                        <p className="text-sm text-muted-foreground">{scholarship.grade_level.join(", ")}</p>
                      </div>
                    </div>
                  )}

                  {scholarship.citizenship.length > 0 && (
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-accent-dark mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Citizenship</p>
                        <p className="text-sm text-muted-foreground">{scholarship.citizenship.join(", ")}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              {scholarship.tags.length > 0 && (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {scholarship.tags.map((tag: string) => (
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

              {/* Fields */}
              {scholarship.field.length > 0 && (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Fields of Study</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {scholarship.field.map((field: string) => (
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
                    {isSaved ? "Saved" : "Save Scholarship"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Sign in to save and track this scholarship
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
