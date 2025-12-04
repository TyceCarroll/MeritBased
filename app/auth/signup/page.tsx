"use client"

import type React from "react"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock, User, GraduationCap } from "lucide-react"

interface UserAccount {
  id: string
  email: string
  password: string
  name: string
  firstName: string
  lastName: string
  gradeLevel: string
  field: string
  gpa: string
  gender: string
  ethnicities: string[]
  fieldOfStudy: string
}

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    gradeLevel: "Middle School",
    gpa: "",
    gender: "",
    ethnicity: [] as string[],
    fieldOfStudy: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEthnicityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      ethnicity: prev.ethnicity.includes(value)
        ? prev.ethnicity.filter((e) => e !== value)
        : [...prev.ethnicity, value],
    }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      const newAccount = {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gradeLevel: formData.gradeLevel,
        field: formData.fieldOfStudy,
        gpa: formData.gpa,
        gender: formData.gender,
        ethnicities: formData.ethnicity,
        fieldOfStudy: formData.fieldOfStudy,
      }

      const existingAccounts = JSON.parse(localStorage.getItem("meritbased_accounts") || "[]")

      if (existingAccounts.some((acc: any) => acc.email === formData.email)) {
        setError("Email already registered")
        setLoading(false)
        return
      }

      existingAccounts.push(newAccount)
      localStorage.setItem("meritbased_accounts", JSON.stringify(existingAccounts))
      localStorage.setItem("meritbased_currentUser", JSON.stringify(newAccount))

      setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 1500)
    } catch (err) {
      setError("Failed to create account. Please try again.")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center py-12">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Account Created!</h1>
            <p className="text-slate-600 mb-6">
              Your account has been created successfully. You can now start exploring merit-based scholarships and
              opportunities.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Return to Home
              </Button>
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-12">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-with-text.png"
                alt="MERITBASED"
                width={200}
                height={80}
                className="mx-auto mb-4"
              />
            </Link>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Start Your Journey</h1>
            <p className="text-slate-600">Create your account to discover merit-based opportunities</p>
          </div>

          <Card className="bg-white shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-slate-800">Create Account</CardTitle>
              <CardDescription>Fill out your information to get personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="pl-10 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          required
                          className="pl-10 pr-10 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-slate-700">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                          className="pl-10 pr-10 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Academic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gradeLevel" className="text-slate-700">
                        Grade Level
                      </Label>
                      <Select
                        value={formData.gradeLevel}
                        onValueChange={(value) => handleInputChange("gradeLevel", value)}
                      >
                        <SelectTrigger className="border-slate-200 focus:border-blue-400 focus:ring-blue-400">
                          <SelectValue placeholder="Select grade level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Middle School">Middle School</SelectItem>
                          <SelectItem value="9th">9th Grade</SelectItem>
                          <SelectItem value="10th">10th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gpa" className="text-slate-700">
                        GPA (Optional)
                      </Label>
                      <Input
                        id="gpa"
                        type="number"
                        step="0.01"
                        min="0"
                        max="4.0"
                        placeholder="e.g., 3.75"
                        value={formData.gpa}
                        onChange={(e) => handleInputChange("gpa", e.target.value)}
                        className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy" className="text-slate-700">
                      Field of Interest (Optional)
                    </Label>
                    <Select
                      value={formData.fieldOfStudy}
                      onValueChange={(value) => handleInputChange("fieldOfStudy", value)}
                    >
                      <SelectTrigger className="border-slate-200 focus:border-blue-400 focus:ring-blue-400">
                        <SelectValue placeholder="Select field of interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STEM">STEM</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Social Sciences">Social Sciences</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-slate-700">
                        Gender (Optional)
                      </Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger className="border-slate-200 focus:border-blue-400 focus:ring-blue-400">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Non-binary">Non-binary</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ethnicity" className="text-slate-700">
                        Ethnicity (Optional) - Select all that apply
                      </Label>
                      <div className="border border-slate-200 rounded-md p-3 space-y-2 max-h-48 overflow-y-auto">
                        {[
                          "African American",
                          "Asian",
                          "Hispanic/Latino",
                          "Native American",
                          "Pacific Islander",
                          "White",
                          "Mixed/Other",
                        ].map((eth) => (
                          <label key={eth} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.ethnicity.includes(eth)}
                              onChange={() => handleEthnicityChange(eth)}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-700">{eth}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  )
}
