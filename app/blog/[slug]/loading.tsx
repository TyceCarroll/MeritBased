import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <Section className="py-8">
        <Container>
          <Skeleton className="h-10 w-32 mb-8" />

          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <Skeleton className="aspect-video w-full rounded-2xl mb-8" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-3/4 mb-6" />
              <div className="flex items-center gap-6 pb-6 border-b border-slate-200">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-20" />
              </div>
            </header>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-8" />

              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full mb-3" />
              ))}
            </div>

            <footer className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="w-16 h-16 rounded-full" />
              </div>
            </footer>
          </article>
        </Container>
      </Section>
    </main>
  )
}
