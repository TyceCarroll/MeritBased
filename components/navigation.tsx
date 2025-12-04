"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth-button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main container: Using justify-between and gap-8 to distribute the three main sections */}
        <div className="flex h-16 items-center justify-between gap-8">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo-sun-only.png"
              alt="MERITBASED Logo"
              width={72}
              height={72}
              className="h-16 w-16 object-contain"
              style={{ filter: "drop-shadow(0 0 0 transparent)" }}
            />
          </Link>

          {/* Desktop Navigation: Using flex-1 to take up central space, and justify-around to evenly spread the links */}
          <div className="hidden md:flex md:items-center md:flex-1 md:justify-around">
            <Link
              href="/scholarships"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Scholarships
            </Link>
            <Link
              href="/opportunities"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Opportunities
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Blog
            </Link>
            <Link
              href="/account"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Account
            </Link>
          </div>

          <div className="hidden md:flex md:flex-shrink-0">
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <Link
                href="/scholarships"
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-primary-light hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Scholarships
              </Link>
              <Link
                href="/opportunities"
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-primary-light hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Opportunities
              </Link>
              <Link
                href="/blog"
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-primary-light hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/account"
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-primary-light hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
              <div className="px-3 py-2">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
