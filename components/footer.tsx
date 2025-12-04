import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-primary-light border-t border-primary/20">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/logo-sun-only.png"
                alt="MERITBASED Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                style={{ filter: "drop-shadow(0 0 0 transparent)" }}
              />
              <span className="text-lg font-bold text-primary">MERITBASED</span>
            </div>
            <p className="text-muted-foreground text-pretty max-w-md">
              Providing underclassmen with scholarships and opportunities without application or attendance fees. Bright
              beginnings for every student.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/scholarships"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/opportunities"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary/20 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MERITBASED. All rights reserved. Empowering students through opportunities.
          </p>
        </div>
      </div>
    </footer>
  )
}
