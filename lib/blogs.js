import { db } from "@/config/firebase";
import { collection, getDocs, query, orderBy, where, doc, getDoc } from "firebase/firestore";

// Helper to format timestamp or date string
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

// Helper to calculate reading time
function calculateReadTime(content = "", excerpt = "") {
  const text = (content + " " + excerpt).replace(/<[^>]*>/g, " ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

// Format raw doc data to sanitized blog object
function formatBlogDoc(id, data) {
  const content = data.content || "";
  const excerpt =
    data.excerpt ||
    content.replace(/<[^>]*>/g, " ").slice(0, 160).trim() + "...";
  const readTime = data.readTime || calculateReadTime(content, excerpt);
  const formattedDate = formatDate(data.createdAt || data.updatedAt);

  let tags = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags;
  } else if (typeof data.tags === "string" && data.tags.trim()) {
    tags = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
  }

  return {
    id,
    title: data.title || "Untitled Article",
    slug: data.slug || id,
    category: data.category || "Education",
    tags,
    featuredImage: data.featuredImage || "",
    readTime,
    author: data.author || "Alinea Academic Team",
    authorRole: data.authorRole || "Senior Subject Specialist",
    status: data.status || "Published",
    content,
    excerpt,
    date: formattedDate,
    createdAtSec: data.createdAt?.seconds || (data.updatedAt?.seconds || 0),
  };
}

/**
 * Fetch all published blogs directly on the server
 */
export async function getPublishedBlogs() {
  try {
    const blogsRef = collection(db, "blogs");
    let snapshot;
    try {
      const q = query(blogsRef, orderBy("createdAt", "desc"));
      snapshot = await getDocs(q);
    } catch {
      snapshot = await getDocs(blogsRef);
    }

    const blogs = snapshot.docs
      .map((d) => formatBlogDoc(d.id, d.data()))
      .filter((b) => b.status !== "Draft")
      .sort((a, b) => b.createdAtSec - a.createdAtSec);

    return blogs;
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    return [];
  }
}

/**
 * Fetch a single blog by slug or ID on the server
 */
export async function getBlogBySlug(slugOrId) {
  if (!slugOrId) return null;

  try {
    const blogsRef = collection(db, "blogs");

    // First try querying by slug field
    const q = query(blogsRef, where("slug", "==", slugOrId));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const docSnap = snap.docs[0];
      return formatBlogDoc(docSnap.id, docSnap.data());
    }

    // Fallback: try by document ID directly
    try {
      const docRef = doc(db, "blogs", slugOrId);
      const directSnap = await getDoc(docRef);
      if (directSnap.exists()) {
        return formatBlogDoc(directSnap.id, directSnap.data());
      }
    } catch {
      // document ID lookup failed
    }

    // Fallback: search all in memory in case slug casing or trimming differs
    const allBlogs = await getPublishedBlogs();
    const found = allBlogs.find(
      (b) =>
        b.slug.toLowerCase() === slugOrId.toLowerCase() ||
        b.id === slugOrId
    );

    return found || null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

/**
 * Fetch recent blogs excluding current slug
 */
export async function getRecentBlogs(currentSlug, limit = 3) {
  try {
    const all = await getPublishedBlogs();
    return all.filter((b) => b.slug !== currentSlug && b.id !== currentSlug).slice(0, limit);
  } catch {
    return [];
  }
}
