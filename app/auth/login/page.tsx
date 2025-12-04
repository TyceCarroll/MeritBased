"use client"

import type React from "react"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const accounts = JSON.parse(localStorage.getItem("meritbased_accounts") || "[]")
      const account = accounts.find(
        (acc: { email: string; password: string }) => acc.email === email && acc.password === password,
      )

      if (!account) {
        setError("Invalid email or password")
        setLoading(false)
        return
      }

      // Save current user session to localStorage
      localStorage.setItem(
        "meritbased_currentUser",
        JSON.stringify({
          email: account.email,
          name: account.name,
          gradeLevel: account.gradeLevel,
          gpa: account.gpa,
          ethnicities: account.ethnicities,
          citizenship: account.citizenship,
          loginTime: new Date().toISOString(),
        }),
      )

      router.push("/account")
      await new Promise((resolve) => setTimeout(resolve, 100))
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center py-12">
      <Container>
        <div className="max-w-md mx-auto">
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
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h1>
            <p className="text-slate-600">Sign in to continue your scholarship journey</p>
          </div>

          <Card className="bg-white shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-slate-800">Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign up
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
