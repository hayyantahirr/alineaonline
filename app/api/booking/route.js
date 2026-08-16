import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Helper function to sanitize text input
function sanitize(input) {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[<>]/g, "");
}

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === "string" && emailRegex.test(email.trim());
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload. Expected JSON object.",
        },
        { status: 400 },
      );
    }

    const {
      parentName,
      studentName,
      email,
      phone,
      subject,
      level,
      examBoard,
      teacherName,
      teacherRole,
      sessionFormat,
      timeSlot,
      targetGrade,
      additionalNotes,
    } = body;

    // Validate required fields
    if (!parentName || !sanitize(parentName)) {
      return NextResponse.json(
        { success: false, error: "Parent/Guardian name is required." },
        { status: 400 },
      );
    }

    if (!studentName || !sanitize(studentName)) {
      return NextResponse.json(
        { success: false, error: "Student name is required." },
        { status: 400 },
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    if (!phone || !sanitize(phone)) {
      return NextResponse.json(
        { success: false, error: "WhatsApp / phone number is required." },
        { status: 400 },
      );
    }

    if (!subject || !sanitize(subject)) {
      return NextResponse.json(
        { success: false, error: "Target subject selection is required." },
        { status: 400 },
      );
    }

    // Build sanitized payload for Firestore
    const bookingData = {
      parentName: sanitize(parentName),
      studentName: sanitize(studentName),
      email: email.trim().toLowerCase(),
      phone: sanitize(phone),
      subject: sanitize(subject),
      level: sanitize(level) || "N/A",
      examBoard: sanitize(examBoard) || "N/A",
      teacherName: sanitize(teacherName) || "Unassigned Specialist",
      teacherRole: sanitize(teacherRole) || "Subject Specialist",
      sessionFormat: sanitize(sessionFormat) || "1:1 Intensive Mentorship",
      timeSlot: sanitize(timeSlot) || "Flexible Timing",

      status: "pending",
      createdAt: serverTimestamp(),
    };

    // Save payload to Firestore collection 'consultation_bookings'
    const docRef = await addDoc(
      collection(db, "consultation_bookings"),
      bookingData,
    );

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: "Consultation request saved successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving consultation booking to Firestore:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "An unexpected server error occurred while processing your booking request.",
      },
      { status: 500 },
    );
  }
}
