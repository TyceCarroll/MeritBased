"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const blogPostsMockData = [
  {
    id: 1,
    title: "Getting Started with Your Scholarship Search",
    slug: "getting-started-scholarship-search",
    excerpt: "Learn how to begin your journey to finding merit-based scholarships that match your profile.",
    full_description:
      "Getting started with your scholarship search can feel overwhelming, but with the right approach, you can find opportunities that match your goals and qualifications.\n\n1. Start Early: Begin your search as soon as possible. Many scholarships have deadlines months in advance.\n\n2. Research Thoroughly: Use multiple scholarship databases, your school's resources, and local organizations. Cast a wide net initially.\n\n3. Read Requirements Carefully: Each scholarship has specific eligibility criteria. Make sure you qualify before spending time on applications.\n\n4. Organize Your Information: Create a spreadsheet to track scholarships, deadlines, requirements, and your application status.\n\n5. Apply to Multiple Scholarships: Don't put all your eggs in one basket. Apply to as many as you qualify for.\n\n6. Follow Instructions: Read every instruction carefully and follow them exactly. Incomplete applications are often rejected.\n\n7. Meet Deadlines: Submit applications early. Technical issues happen, so don't wait until the last minute.\n\n8. Customize Your Applications: Tailor your essays and applications to each scholarship's mission and values.\n\nRemember, finding scholarships takes time and effort, but the financial support is worth it. Start your search today!",
    author: "Sarah Johnson",
    category: "Guide",
    read_time: "5 min read",
    date: "2024-01-15",
    image_url: "/scholarship-essay-writing-desk.jpg",
  },
  {
    id: 2,
    title: "Top Tips for a Winning Scholarship Essay",
    slug: "winning-scholarship-essay",
    excerpt: "Discover strategies to write compelling essays that stand out to scholarship reviewers.",
    full_description:
      "Writing a winning scholarship essay requires planning, authenticity, and revision. Here are the top strategies:\n\n1. Understand the Prompt: Read the essay prompt multiple times. Make sure you understand exactly what's being asked.\n\n2. Start with a Strong Hook: Begin with something that captures attention - a compelling story, statistic, or question.\n\n3. Be Authentic: Write in your own voice. Scholarship committees can tell when essays are inauthentic or overly formal.\n\n4. Show, Don't Tell: Use specific examples and stories to illustrate your points rather than making general statements.\n\n5. Connect Your Experience to Your Future: Explain how your background and experiences have shaped your goals and ambitions.\n\n6. Address the Scholarship's Values: Research the organization and connect your values to theirs.\n\n7. Edit Multiple Times: Your first draft is never your best. Revise for clarity, grammar, and flow.\n\n8. Get Feedback: Have teachers, mentors, or friends review your essay. Fresh eyes catch things you miss.\n\n9. Proofread Carefully: Typos and grammatical errors can cost you the scholarship. Proofread multiple times.\n\n10. Stay Within Limits: Follow word count and formatting requirements exactly.\n\nYour essay is your chance to tell your story. Make it memorable!",
    author: "Michael Chen",
    category: "Tips",
    read_time: "7 min read",
    date: "2024-01-10",
    image_url: "/stem-students-science-laboratory.jpg",
  },
  {
    id: 3,
    title: "Internship Opportunities for High School Students",
    slug: "internship-opportunities",
    excerpt: "Explore summer internships and year-round programs designed for underclassmen.",
    full_description:
      "High school is the perfect time to start gaining professional experience through internships. Here's what you need to know:\n\n1. Types of Internships: Summer internships, year-round programs, hybrid roles - there are options for different schedules.\n\n2. Where to Find Internships: Check company websites, internship databases, career fairs, and your school's career center.\n\n3. Start Early: Apply to summer internships in winter and early spring. Popular programs fill up quickly.\n\n4. Tailor Your Resume: Highlight relevant skills and experiences. Even if you don't have formal work experience, mention school projects, volunteer work, and leadership roles.\n\n5. Write a Strong Cover Letter: Explain why you're interested in the internship and what you hope to learn.\n\n6. Prepare for Interviews: Practice common interview questions and research the company thoroughly.\n\n7. Make the Most of Your Internship: Take initiative, ask questions, build relationships, and document your accomplishments.\n\n8. Network: Connect with your colleagues and supervisors. These relationships can lead to future job opportunities.\n\n9. Follow Up: After your internship ends, stay in touch with your supervisor and colleagues.\n\nAn internship in high school can give you a significant advantage when applying to colleges and competing for future jobs.",
    author: "Emily Rodriguez",
    category: "Opportunities",
    read_time: "6 min read",
    date: "2024-01-05",
    image_url: "/professional-workplace-office-environment.jpg",
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (slug) {
      console.log("[v0] Searching for blog post with slug:", slug)
      console.log(
        "[v0] Available slugs:",
        blogPostsMockData.map((p) => p.slug),
      )
      const found = blogPostsMockData.find((p) => p.slug === slug)
      console.log("[v0] Found post:", found)
      if (found) {
        setPost(found)
      } else {
        setError(true)
      }
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
        <Section className="py-8">
          <Container>
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-4">Blog post not found</p>
              <Button asChild>
                <Link href="/blog">Back to Blog</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <Section className="py-8">
        <Container>
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <div className="aspect-video relative overflow-hidden rounded-2xl mb-8 shadow-xl">
                <Image
                  src={
                    post.image_url ||
                    `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(post.title) || "/placeholder.svg"}`
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 mb-4">{post.category}</Badge>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-balance leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-6 text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.read_time}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <div className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-semibold prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg whitespace-pre-line">
                {post.full_description}
              </div>
            </div>

            {/* Article Footer */}
            <footer className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">About the Author</h3>
                  <p className="text-slate-600">
                    {post.author} is part of the MERITBASED team, dedicated to helping students find merit-based
                    opportunities.
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {post.author && post.author.length > 0 ? post.author.charAt(0) : "A"}
                </div>
              </div>
            </footer>
          </article>
        </Container>
      </Section>
    </main>
  )
}
