import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";

// Helper to format/title-case subject title
function formatTitle(title = "") {
  if (!title) return "Subject";
  return title
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Helper to sanitize lists
function sanitizeList(arr) {
  if (!Array.isArray(arr)) {
    if (typeof arr === "string" && arr.trim()) {
      return [arr.trim()];
    }
    return [];
  }
  return arr
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter(Boolean);
}

// Helper to sanitize board objects
function sanitizeBoard(board, index) {
  if (!board || typeof board !== "object") return null;
  const boardId = String(board.id || `board-${index}`).trim().toLowerCase();
  return {
    id: boardId,
    label: String(board.label || board.id || "Board").trim(),
    syllabus: String(board.syllabus || "").trim(),
    modules: sanitizeList(board.modules),
    examStructure: sanitizeList(board.examStructure),
    skills: sanitizeList(board.skills),
  };
}

// Helper to sanitize level objects
function sanitizeLevel(level, index) {
  if (!level || typeof level !== "object") return null;
  const levelId = String(level.id || `level-${index}`).trim().toLowerCase();
  const boards = Array.isArray(level.boards)
    ? level.boards.map(sanitizeBoard).filter(Boolean)
    : [];

  return {
    id: levelId,
    label: String(level.label || level.id || "Level").trim(),
    boards: boards,
  };
}

export async function GET() {
  try {
    let subjects = [];

    try {
      const snap = await getDocs(collection(db, "subjects"));
      subjects = snap.docs.map((doc, idx) => {
        const data = doc.data();
        const rawTitle = data.title || "Subject";
        const formattedTitle = formatTitle(rawTitle);

        // Sanitize levels & boards
        let levels = [];
        if (Array.isArray(data.levels)) {
          levels = data.levels.map(sanitizeLevel).filter(Boolean);
        }

        // Format num (e.g., "01", "02")
        const num = data.num
          ? String(data.num).padStart(2, "0")
          : String(idx + 1).padStart(2, "0");

        return {
          id: doc.id,
          num: num,
          title: formattedTitle,
          bookingParam: formattedTitle,
          tag: data.tag || "FLAGSHIP",
          badgeType: data.badgeType || "red-outline",
          description:
            data.description ||
            `Comprehensive ${formattedTitle} curriculum mapped directly to exam board specifications with examiner rubrics.`,
          tutor: data.tutor || "Examiner-Trained Subject Lead",
          levels: levels,
        };
      });

      // Sort by num or title
      subjects.sort((a, b) => {
        const numA = parseInt(a.num, 10);
        const numB = parseInt(b.num, 10);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.title.localeCompare(b.title);
      });
    } catch (dbError) {
      console.error("Firestore subjects fetch error:", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        count: subjects.length,
        subjects: subjects,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/subjects error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch subjects",
        subjects: [],
      },
      { status: 500 }
    );
  }
}
