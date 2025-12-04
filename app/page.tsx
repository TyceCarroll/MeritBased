import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { RisingSunPhases } from "@/components/rising-sun-phases"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-primary-light to-white">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Side - Logo and Buttons */}
            <div className="flex flex-col items-center lg:items-start space-y-8 animate-rise">
              <div className="flex flex-col items-center lg:items-start space-y-4 w-full">
                <Image
                  src="/images/logo-with-text.png"
                  alt="MERITBASED - Rising Sun Logo"
                  width={500}
                  height={375}
                  className="w-full max-w-md lg:max-w-lg h-auto object-contain"
                  style={{ filter: "drop-shadow(0 0 0 transparent)" }}
                  priority
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <Link href="/scholarships">Find Scholarships</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 bg-transparent"
                >
                  <Link href="/opportunities">Find Opportunities</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Company Message */}
            <div className="hidden lg:flex flex-col space-y-6 animate-rise" style={{ animationDelay: "0.2s" }}>
              <div className="text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-6">
                  A Scholarship & Opportunity database designed for underclassmen with:
                </h1>

                <ul className="space-y-4 text-lg text-muted-foreground">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>No fees to apply</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>No fees to attend</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>Merit-based recognition</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>Personalized recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Rising Sun Phases Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 text-balance">Your Journey to Success</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Follow our simple three-step process to discover and secure opportunities
            </p>
          </div>

          <RisingSunPhases />
        </Container>
      </Section>

      {/* Call to Action Section */}
      <Section className="bg-primary-light">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6 text-balance">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Join numerous students who have discovered amazing opportunities through MERITBASED. Your bright beginning
              starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <Link href="/auth/signup">Get Started Today</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 bg-transparent"
              >
                <Link href="/blog">Learn More</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
