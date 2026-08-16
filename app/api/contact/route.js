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

    const { parentName, studentName, email, phone, subject, message } = body;

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
        { success: false, error: "Phone / WhatsApp number is required." },
        { status: 400 },
      );
    }

    if (!message || !sanitize(message)) {
      return NextResponse.json(
        { success: false, error: "Message content cannot be empty." },
        { status: 400 },
      );
    }

    // Build sanitized payload
    const sanitizedData = {
      parentName: sanitize(parentName),
      studentName: sanitize(studentName),
      email: email.trim().toLowerCase(),
      phone: sanitize(phone),
      subject: sanitize(subject) || "General Enquiry",
      message: sanitize(message),
      status: "unread",
      createdAt: serverTimestamp(),
    };

    // Save to Firestore collection 'contact_messages'
    const docRef = await addDoc(
      collection(db, "contact_messages"),
      sanitizedData,
    );

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: "Contact message received and saved successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving contact message to Firestore:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "An unexpected server error occurred while processing your request.",
      },
      { status: 500 },
    );
  }
}
