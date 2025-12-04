"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { User, GraduationCap, Mail, Calendar, BookOpen, Target, LogOut } from "lucide-react"
import { mockScholarships, mockOpportunities } from "@/lib/mock-data"

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [savedItems, setSavedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    try {
      const currentUser = localStorage.getItem("meritbased_currentUser")

      if (!currentUser) {
        router.push("/auth/login")
        return
      }

      const userData = JSON.parse(currentUser)
      setUser(userData)

      const userKey = userData.email.replace(/[@.]/g, "_")
      const scholarships = JSON.parse(localStorage.getItem(`meritbased_savedScholarships_${userKey}`) || "[]")
      const opportunities = JSON.parse(localStorage.getItem(`meritbased_savedOpportunities_${userKey}`) || "[]")

      const allSavedItems = [
        ...scholarships.map((s: any) => ({ ...s, type: "scholarship" })),
        ...opportunities.map((o: any) => ({ ...o, type: "opportunity" })),
      ]

      setSavedItems(allSavedItems)
    } catch (error) {
      console.error("[v0] Error loading user data:", error)
      router.push("/auth/login")
      return
    } finally {
      setLoading(false)
    }
  }, [router, mounted])

  const handleLogout = () => {
    localStorage.removeItem("meritbased_currentUser")
    router.push("/")
  }

  if (!mounted || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </main>
    )
  }

  if (!user) {
    return null
  }

  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n: string) => n?.charAt?.(0) || "")
        .join("")
        .toUpperCase()
    : "U"

  const recommendedScholarships = mockScholarships.filter((s) => {
    if (!s.field_of_study) return false
    const fieldMatch = s.field_of_study === user.field || s.field_of_study === "General"
    const gradeMatch = s.grade_level && s.grade_level.includes(user.gradeLevel)
    return fieldMatch && gradeMatch
  })

  const recommendedOpportunities = mockOpportunities.filter((o) => {
    if (!o.field) return false
    const fieldArray = Array.isArray(o.field) ? o.field : [o.field]
    const fieldMatch = fieldArray.some((f) => f === user.field || f === "General")
    const gradeMatch = o.grade_level && o.grade_level.includes(user.gradeLevel)
    return fieldMatch && gradeMatch
  })

  const formattedSavedItems = savedItems.map((item) => {
    const isScholarship = item.type === "scholarship"
    const itemData = isScholarship
      ? mockScholarships.find((s) => s.id === item.id)
      : mockOpportunities.find((o) => o.id === item.id)

    return {
      ...item,
      itemData,
      isScholarship,
    }
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl text-slate-800">{user.name || "Student"}</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.gradeLevel && (
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-800">Grade Level</p>
                        <p className="text-slate-600">{user.gradeLevel}</p>
                      </div>
                    </div>
                  )}

                  {user.gpa && (
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-800">GPA</p>
                        <p className="text-slate-600">{user.gpa}</p>
                      </div>
                    </div>
                  )}

                  {user.field && (
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-800">Field of Interest</p>
                        <p className="text-slate-600">{user.field}</p>
                      </div>
                    </div>
                  )}

                  {user.ethnicities && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-800">Ethnicity</p>
                        <p className="text-slate-600 text-sm">{user.ethnicities.join(", ")}</p>
                      </div>
                    </div>
                  )}

                  {user.loginTime && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-800">Member Since</p>
                        <p className="text-slate-600">{new Date(user.loginTime).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recommendations */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-500" />
                    Recommended For You
                  </CardTitle>
                  <CardDescription>Personalized scholarships and opportunities based on your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Recommended Scholarships */}
                  {recommendedScholarships && recommendedScholarships.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-3">Scholarships</h3>
                      <div className="space-y-3">
                        {recommendedScholarships.slice(0, 2).map((scholarship) => (
                          <Link key={scholarship.id} href={`/scholarships/${scholarship.id}`}>
                            <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-slate-800 mb-1">{scholarship.title}</h4>
                                  <p className="text-sm text-slate-600 mb-2 line-clamp-2">{scholarship.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="font-medium text-green-600">
                                      ${scholarship.amount?.toLocaleString()}
                                    </span>
                                    <span>Due: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                  {scholarship.field_of_study}
                                </Badge>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Opportunities */}
                  {recommendedOpportunities && recommendedOpportunities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-3">Opportunities</h3>
                      <div className="space-y-3">
                        {recommendedOpportunities.slice(0, 2).map((opportunity) => (
                          <Link key={opportunity.id} href={`/opportunities/${opportunity.id}`}>
                            <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-slate-800 mb-1">{opportunity.title}</h4>
                                  <p className="text-sm text-slate-600 mb-2 line-clamp-2">{opportunity.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span>{opportunity.location}</span>
                                    <span>{opportunity.duration}</span>
                                  </div>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  {Array.isArray(opportunity.field) ? opportunity.field[0] : opportunity.field}
                                </Badge>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {!recommendedScholarships?.length && !recommendedOpportunities?.length && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">No Recommendations Yet</h3>
                      <p className="text-slate-600">Start exploring scholarships and opportunities</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Saved Items Tracker */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Saved Scholarship/Opportunity Tracker
                  </CardTitle>
                  <CardDescription>Track your applications and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  {formattedSavedItems && formattedSavedItems.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 text-sm font-medium text-slate-600 border-b pb-2">
                        <div>Name</div>
                        <div>Type</div>
                        <div>Deadline</div>
                        <div>Action</div>
                      </div>
                      {formattedSavedItems.map((item) => {
                        const deadline = item.isScholarship
                          ? item.itemData?.deadline
                          : item.itemData?.applicationDeadline || "Rolling"

                        return (
                          <div
                            key={item.id}
                            className="grid grid-cols-4 gap-4 items-center py-3 border-b border-slate-100 last:border-b-0"
                          >
                            <div>
                              <h4 className="font-medium text-slate-800">{item.itemData?.title}</h4>
                              <Badge variant="outline" size="sm" className="mt-1">
                                {item.isScholarship ? "Scholarship" : "Opportunity"}
                              </Badge>
                            </div>
                            <div>
                              <Badge
                                variant={item.status === "applied" ? "default" : "secondary"}
                                className={
                                  item.status === "applied"
                                    ? "bg-green-100 text-green-800"
                                    : item.status === "saved"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {item.status && item.status.length > 0
                                  ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                                  : "Saved"}
                              </Badge>
                            </div>
                            <div className="text-sm text-slate-600">
                              {deadline ? new Date(deadline).toLocaleDateString() : "Rolling"}
                            </div>
                            <div>
                              <Link
                                href={`/${item.isScholarship ? "scholarships" : "opportunities"}/${item.itemData?.id}`}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">No Saved Items Yet</h3>
                      <p className="text-slate-600 mb-4">
                        Start exploring scholarships and opportunities to build your list
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Link href="/scholarships">
                          <Button
                            variant="outline"
                            className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                          >
                            Browse Scholarships
                          </Button>
                        </Link>
                        <Link href="/opportunities">
                          <Button
                            variant="outline"
                            className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                          >
                            Browse Opportunities
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
