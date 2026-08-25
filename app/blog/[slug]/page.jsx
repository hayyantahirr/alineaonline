import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { getBlogBySlug, getRecentBlogs } from "@/lib/blogs";
import ShareButton from "@/components/blog/ShareButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Alinea Online Blog",
      description: "The requested academic article could not be found.",
    };
  }

  return {
    title: `${blog.title} | Alinea Online Academic Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const recentBlogs = await getRecentBlogs(slug, 3);

  if (!blog) {
    return (
      <div className="w-full min-h-screen bg-[#faf8f2] py-24 px-6 flex flex-col items-center justify-center text-center">
        <div className="max-w-md bg-white p-10 rounded-3xl border-2 border-line shadow-lg">
          <div className="w-16 h-16 bg-[#c0392b]/10 text-[#c0392b] rounded-full flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="font-['Archivo_Black'] text-2xl text-on-background mb-3">
            Article Not Found
          </h2>
          <p className="font-['Work_Sans'] text-sm text-on-surface-variant mb-6">
            The article you are looking for may have been moved or is no longer available.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-xs px-6 py-3 rounded-full border-2 border-on-background neo-brutalist-shadow hover:-translate-y-0.5 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="w-full bg-[#faf8f2] text-on-background min-h-screen pb-24">
      {/* Top Header / Breadcrumb Bar */}
      <header className="bg-on-background text-white pt-12 pb-16 md:pb-20 px-6 border-b-4 border-primary-container relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-surface-variant hover:text-primary-container font-['Work_Sans'] text-xs font-bold uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              {blog.category || "Education"}
            </span>
            {blog.readTime && (
              <span className="bg-white/10 text-white font-['IBM_Plex_Mono'] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary-container" />
                {blog.readTime}
              </span>
            )}
            {blog.date && (
              <span className="text-surface-variant font-['IBM_Plex_Mono'] text-xs flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {blog.date}
              </span>
            )}
          </div>

          {/* Article Title */}
          <h1 className="font-['Archivo_Black'] text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white leading-[1.15] mb-6 tracking-tight">
            {blog.title}
          </h1>

          {/* Author Info & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-background flex items-center justify-center font-['Archivo_Black'] text-lg shrink-0 border border-white/20">
                {(blog.author || "A").charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="font-['Work_Sans'] font-extrabold text-sm text-white block">
                  {blog.author || "Alinea Academic Team"}
                </span>
                <span className="font-['IBM_Plex_Mono'] text-xs text-surface-variant">
                  {blog.authorRole || "Senior Subject Specialist"}
                </span>
              </div>
            </div>

            <ShareButton />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 -mt-6">
        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="w-full h-72 sm:h-96 md:h-115 rounded-3xl overflow-hidden border-2 border-on-background shadow-[8px_8px_0_0_var(--color-on-background)] relative mb-12 bg-surface-container-low">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Excerpt Lead Paragraph */}
        {blog.excerpt && (
          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-line mb-10 shadow-xs">
            <p className="font-['Work_Sans'] text-base md:text-lg text-on-background leading-relaxed font-medium italic">
              &ldquo;{blog.excerpt}&rdquo;
            </p>
          </div>
        )}

        {/* HTML Article Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 border-2 border-line shadow-xs">
          <div
            className="article-content font-['Work_Sans'] text-base sm:text-lg text-on-background leading-relaxed space-y-6 
            [&_h1]:font-['Archivo_Black'] [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:text-on-background [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:pt-4 [&_h1]:border-t [&_h1]:border-line
            [&_h2]:font-['Archivo_Black'] [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:text-on-background [&_h2]:mt-8 [&_h2]:mb-3
            [&_h3]:font-['Archivo_Black'] [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:text-on-background [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:leading-relaxed [&_p]:text-on-surface-variant [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-on-surface-variant [&_ul]:mb-6
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:text-on-surface-variant [&_ol]:mb-6
            [&_li]:leading-relaxed
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#c0392b] [&_blockquote]:pl-5 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:bg-[#faf8f2] [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:text-on-background
            [&_img]:rounded-2xl [&_img]:my-8 [&_img]:border [&_img]:border-line [&_img]:shadow-sm [&_img]:max-w-full [&_img]:h-auto
            [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse [&_table]:border [&_table]:border-line [&_table]:rounded-xl [&_table]:overflow-hidden
            [&_thead]:bg-primary-container [&_thead]:text-on-background
            [&_th]:p-3.5 [&_th]:text-left [&_th]:font-['IBM_Plex_Mono'] [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-wider [&_th]:border [&_th]:border-line
            [&_td]:p-3.5 [&_td]:border [&_td]:border-line [&_td]:text-sm [&_td]:text-on-surface-variant
            [&_strong]:text-on-background [&_strong]:font-bold
            [&_a]:text-[#c0392b] [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-on-background"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t-2 border-line flex flex-wrap items-center gap-2">
              <span className="font-['IBM_Plex_Mono'] text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5 text-[#c0392b]" /> Tags:
              </span>
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="font-['IBM_Plex_Mono'] text-xs font-medium px-3 py-1 rounded-lg bg-[#faf8f2] border border-line text-on-surface-variant"
                >
                  {tag.startsWith("#") ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA Consultation Banner */}
        <section className="mt-12 bg-primary-container rounded-3xl p-8 sm:p-12 border-2 border-on-background neo-brutalist-shadow flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="bg-on-background text-white font-['IBM_Plex_Mono'] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
              1:1 ACADEMIC MENTORSHIP
            </span>
            <h3 className="font-['Archivo_Black'] text-2xl sm:text-3xl text-on-background mb-3">
              Turn These Insights into Top Grades
            </h3>
            <p className="font-['Work_Sans'] text-sm text-on-primary-container leading-relaxed">
              Work 1:1 with examiner-trained specialists who review your past papers, diagnose syllabus gaps, and guide your exam technique.
            </p>
          </div>

          <Link
            href="/booking"
            className="shrink-0 bg-on-background text-white font-['Work_Sans'] font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full border-2 border-on-background shadow-[4px_4px_0_0_#ffffff] hover:-translate-y-0.5 transition-transform inline-flex items-center gap-2"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4 text-primary-container" />
          </Link>
        </section>

        {/* More Articles Section */}
        {recentBlogs.length > 0 && (
          <section className="mt-16 pt-12 border-t-2 border-line">
            <h3 className="font-['Archivo_Black'] text-2xl text-on-background mb-8">
              More Insights &amp; Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentBlogs.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug || item.id}`}
                  className="bg-white rounded-2xl p-5 border-2 border-line hover:border-on-background hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--color-on-background)] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {item.featuredImage && (
                      <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative bg-surface-container-low">
                        <Image
                          src={item.featuredImage}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold text-[#c0392b] uppercase block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-['Archivo_Black'] text-base text-on-background group-hover:text-[#c0392b] transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h4>
                    <p className="font-['Work_Sans'] text-xs text-on-surface-variant line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="font-['Work_Sans'] font-extrabold text-xs text-[#c0392b] inline-flex items-center gap-1 mt-4">
                    Read Post <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </article>
  );
}
