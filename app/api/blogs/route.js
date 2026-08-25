import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

export const dynamic = "force-dynamic";

// Helper to format Firestore timestamp or string date
function formatDate(timestamp) {
  if (!timestamp) return "Recent";
  if (typeof timestamp === "string") return timestamp;
  if (timestamp.toDate && typeof timestamp.toDate === "function") {
    return timestamp.toDate().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return "Recent";
}

// Helper to calculate reading time from HTML content if readTime is not provided
function calculateReadTime(content = "", excerpt = "") {
  const text = (content + " " + excerpt).replace(/<[^>]*>/g, " ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slugParam = searchParams.get("slug");
    const idParam = searchParams.get("id");

    const blogsRef = collection(db, "blogs");
    let blogs = [];

    try {
      let snapshot;
      try {
        const q = query(blogsRef, orderBy("createdAt", "desc"));
        snapshot = await getDocs(q);
      } catch (orderErr) {
        // Fallback without ordering in case index or field is missing
        snapshot = await getDocs(blogsRef);
      }

      blogs = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          const content = data.content || "";
          const excerpt = data.excerpt || content.replace(/<[^>]*>/g, " ").slice(0, 180).trim() + "...";
          const readTime = data.readTime || calculateReadTime(content, excerpt);
          const formattedDate = formatDate(data.createdAt || data.updatedAt);

          let tags = [];
          if (Array.isArray(data.tags)) {
            tags = data.tags;
          } else if (typeof data.tags === "string" && data.tags.trim()) {
            tags = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
          }

          return {
            id: doc.id,
            title: data.title || "Untitled Article",
            slug: data.slug || doc.id,
            category: data.category || "Education",
            tags: tags,
            featuredImage: data.featuredImage || "",
            readTime: readTime,
            author: data.author || "Alinea Academic Team",
            authorRole: data.authorRole || "Senior Subject Specialist",
            status: data.status || "Published",
            content: content,
            excerpt: excerpt,
            date: formattedDate,
            createdAt: data.createdAt ? (data.createdAt.seconds || null) : null,
          };
        })
        .filter((b) => b.status !== "Draft");
    } catch (dbError) {
      console.error("Firestore blogs fetch error:", dbError);
    }

    // If specific slug or id requested
    if (slugParam) {
      const singleBlog = blogs.find((b) => b.slug === slugParam || b.id === slugParam);
      if (singleBlog) {
        return NextResponse.json({ success: true, blog: singleBlog }, { status: 200 });
      }
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    if (idParam) {
      const singleBlog = blogs.find((b) => b.id === idParam);
      if (singleBlog) {
        return NextResponse.json({ success: true, blog: singleBlog }, { status: 200 });
      }
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        count: blogs.length,
        blogs: blogs,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch blog articles",
        blogs: [],
      },
      { status: 500 }
    );
  }
}
