import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let teachers = [];

    try {
      const teachersRef = collection(db, "teachers");
      let snapshot;

      try {
        const q = query(teachersRef, orderBy("createdAt", "desc"));
        snapshot = await getDocs(q);
      } catch (orderError) {
        // Fallback without ordering in case index or field is missing
        snapshot = await getDocs(teachersRef);
      }

      teachers = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          
          // Format boards to always be an array
          let boards = [];
          if (Array.isArray(data.boards)) {
            boards = data.boards;
          } else if (typeof data.boards === "string" && data.boards.trim()) {
            boards = data.boards.split(",").map((b) => b.trim()).filter(Boolean);
          }

          // Format highlights to always be an array
          let highlights = [];
          if (Array.isArray(data.highlights)) {
            highlights = data.highlights.filter(
              (h) => typeof h === "string" && h.trim() !== ""
            );
          } else if (typeof data.highlights === "string" && data.highlights.trim()) {
            highlights = [data.highlights.trim()];
          }

          // Format availability status
          const availabilityStatus =
            data.availabilityStatus === "limited" ? "limited" : "available";
          const availability =
            data.availability ||
            (availabilityStatus === "available"
              ? "Accepting New Students"
              : "Limited Slots Available");

          // Handle subject names
          const subject = data.subject || "Subject Specialist";
          const subjectBookingParam =
            data.subjectBookingParam || data.subject || "Economics";

          return {
            id: doc.id,
            name: data.name || "Specialist Tutor",
            role: data.role || `${subject} Specialist`,
            image: data.image || "",
            subject: subject,
            subjectBookingParam: subjectBookingParam,
            levels: data.levels || "IGCSE & A-Level",
            boards: boards.length > 0 ? boards : ["CAIE", "Edexcel"],
            experience: data.experience || "5+ Years",
            qualification: data.qualification || "Examiner Trained",
            availability: availability,
            availabilityStatus: availabilityStatus,
            bio:
              data.bio ||
              "Examiner-trained subject specialist focused on mark-scheme mastery, exam board precision, and tailored grade improvement.",
            highlights: highlights,
            status: data.status || "active",
          };
        })
        .filter((t) => t.status !== "inactive");
    } catch (dbError) {
      console.error("Firestore teachers fetch error:", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        count: teachers.length,
        teachers: teachers,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/teachers error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch teachers",
        teachers: [],
      },
      { status: 500 }
    );
  }
}
