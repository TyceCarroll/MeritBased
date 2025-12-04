"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Settings, LogOut, BookOpen } from "lucide-react"

interface LocalUser {
  email: string
  name?: string
}

export function AuthButton() {
  const [user, setUser] = useState<LocalUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUserStr = localStorage.getItem("meritbased_currentUser")
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr)
        setUser(currentUser)
      } catch (error) {
        console.error("[v0] Error parsing user from localStorage:", error)
        setUser(null)
      }
    }
    setLoading(false)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("meritbased_currentUser")
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <Button variant="outline" disabled className="border-blue-200 text-blue-600 bg-transparent">
        Loading...
      </Button>
    )
  }

  if (!user) {
    return (
      <Link href="/auth/login">
        <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
          Sign In
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
          <User className="w-4 h-4 mr-2" />
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium text-slate-900">{user.name || user.email}</div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/scholarships" className="cursor-pointer">
            <BookOpen className="w-4 h-4 mr-2" />
            Browse Scholarships
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
