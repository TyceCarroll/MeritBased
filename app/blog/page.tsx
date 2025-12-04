import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock, User } from "lucide-react"

const mockBlogPosts = [
  {
    id: 1,
    title: "Getting Started with Your Scholarship Search",
    slug: "getting-started-scholarship-search",
    excerpt: "Learn how to begin your journey to finding merit-based scholarships that match your profile.",
    content: "Full article content here...",
    featured_image: "/scholarship-concept.png",
    author: "Sarah Johnson",
    category: "Guide",
    read_time: 5,
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Top Tips for a Winning Scholarship Essay",
    slug: "winning-scholarship-essay",
    excerpt: "Discover strategies to write compelling essays that stand out to scholarship reviewers.",
    content: "Full article content here...",
    featured_image: "/essay.jpg",
    author: "Michael Chen",
    category: "Tips",
    read_time: 7,
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Internship Opportunities for High School Students",
    slug: "internship-opportunities",
    excerpt: "Explore summer internships and year-round programs designed for underclassmen.",
    content: "Full article content here...",
    featured_image: "/internship-office.png",
    author: "Emily Rodriguez",
    category: "Opportunities",
    read_time: 6,
    published: true,
    created_at: new Date().toISOString(),
  },
]

export default function BlogPage() {
  const posts = mockBlogPosts

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <Section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 text-balance">MERITBASED Blog</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              Guidance, tips, and insights to help you navigate your scholarship journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.featured_image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        {post.category}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.read_time} min read</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {(!posts || posts.length === 0) && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">Coming Soon!</h3>
              <p className="text-slate-600">
                We're working on bringing you valuable content to help with your scholarship journey.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}
