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
      fullName,
      email,
      phone,
      country,
      city,
      subject,
      positionAppliedFor,
      levels,
      experience,
      experienceYears,
      examBoards,
      availability,
      availabilityHours,
      availabilitySlots,
      about,
      coverMessage,
      photoUrl,
      cvUrl,
      portfolioOrResumeUrl,
      cvType,
    } = body;

    // Resolve field aliases
    const resolvedSubject = sanitize(subject || positionAppliedFor);
    const resolvedExperience = sanitize(experience || experienceYears);
    const resolvedAbout = sanitize(about || coverMessage);
    const resolvedCvUrl = (cvUrl || portfolioOrResumeUrl || "")
      .toString()
      .trim();

    // Validation
    if (!fullName || !sanitize(fullName)) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
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

    if (!country || !sanitize(country)) {
      return NextResponse.json(
        { success: false, error: "Country selection is required." },
        { status: 400 },
      );
    }

    if (!city || !sanitize(city)) {
      return NextResponse.json(
        { success: false, error: "City is required." },
        { status: 400 },
      );
    }

    if (!resolvedSubject) {
      return NextResponse.json(
        {
          success: false,
          error: "Teaching subject / position applied for is required.",
        },
        { status: 400 },
      );
    }

    if (!levels || !sanitize(levels)) {
      return NextResponse.json(
        { success: false, error: "Teaching level(s) selection is required." },
        { status: 400 },
      );
    }

    if (!resolvedExperience) {
      return NextResponse.json(
        { success: false, error: "Years of teaching experience is required." },
        { status: 400 },
      );
    }

    if (!Array.isArray(examBoards) || examBoards.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one exam board must be selected." },
        { status: 400 },
      );
    }

    const sanitizedBoards = examBoards
      .map((b) => sanitize(b))
      .filter((b) => b.length > 0);

    if (sanitizedBoards.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select or provide valid exam boards.",
        },
        { status: 400 },
      );
    }

    if (!resolvedAbout) {
      return NextResponse.json(
        { success: false, error: "Introduction / cover message is required." },
        { status: 400 },
      );
    }

    if (!resolvedCvUrl) {
      return NextResponse.json(
        { success: false, error: "CV / Resume file upload is required." },
        { status: 400 },
      );
    }

    const sanitizedAvailabilitySlots = Array.isArray(availabilitySlots)
      ? availabilitySlots.map(sanitize).filter(Boolean)
      : [];

    // Build sanitized application document
    const applicationData = {
      fullName: sanitize(fullName),
      email: email.trim().toLowerCase(),
      phone: sanitize(phone),
      country: sanitize(country),
      city: sanitize(city),
      subject: resolvedSubject,
      levels: sanitize(levels),
      experience: resolvedExperience,
      examBoards: sanitizedBoards,
      availability: sanitize(availability) || "Flexible",
      availabilityHours: sanitize(availabilityHours) || "",
      availabilitySlots: sanitizedAvailabilitySlots,
      about: resolvedAbout,
      photoUrl: sanitize(photoUrl) || "",
      cvUrl: resolvedCvUrl,
      cvType: sanitize(cvType) || "",
      status: "unread",
      createdAt: serverTimestamp(),
    };

    // Save to Firestore collection 'career_applications'
    const docRef = await addDoc(
      collection(db, "career_applications"),
      applicationData,
    );

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: "Teacher application submitted successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving career application to Firestore:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "An unexpected server error occurred while processing your application.",
      },
      { status: 500 },
    );
  }
}
