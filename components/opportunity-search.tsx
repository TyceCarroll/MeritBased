"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function OpportunitySearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (search.trim()) {
      params.set("search", search.trim())
    } else {
      params.delete("search")
    }

    router.push(`/opportunities?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder="Search by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-20 h-12 text-lg border-2 border-primary/30 focus:border-primary rounded-lg"
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
