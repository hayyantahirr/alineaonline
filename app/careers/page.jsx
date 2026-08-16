"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  Camera,
  CheckCircle2,
  Send,
  Plus,
  X,
  Check,
  Loader2,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import TeacherRubricVisual from "@/components/careers/TeacherRubricVisual";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    subject: "",
    levels: "",
    experience: "",
    examBoards: [],
    availabilityHours: "",
    availabilitySlots: [],
    about: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customBoardInput, setCustomBoardInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [boardError, setBoardError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const photoInputRef = useRef(null);
  const cvInputRef = useRef(null);

  const presetBoards = [
    "Cambridge (CAIE)",
    "Edexcel (Pearson)",
    "AQA",
    "OCR",
    "IB (International Baccalaureate)",
    "AP (Advanced Placement)",
    "WJEC / Eduqas",
  ];

  const presetSlots = [
    "Weekday Evenings (4 PM – 9 PM GST)",
    "Weekend Mornings (9 AM – 1 PM GST)",
    "Weekend Evenings (2 PM – 9 PM GST)",
    "Weekday Daytime (10 AM – 4 PM GST)",
    "Flexible / Any Time",
  ];

  const toggleAvailabilitySlot = (slot) => {
    if (!slot) return;
    setFormData((prev) => {
      const exists = prev.availabilitySlots.includes(slot);
      const next = exists
        ? prev.availabilitySlots.filter((s) => s !== slot)
        : [...prev.availabilitySlots, slot];
      return { ...prev, availabilitySlots: next };
    });
  };

  const toggleExamBoard = (board) => {
    if (!board || !board.trim()) return;
    const trimmed = board.trim();
    setFormData((prev) => {
      const exists = prev.examBoards.includes(trimmed);
      const next = exists
        ? prev.examBoards.filter((b) => b !== trimmed)
        : [...prev.examBoards, trimmed];
      return { ...prev, examBoards: next };
    });
    if (boardError) setBoardError("");
  };

  const addExamBoard = (board) => {
    if (!board || !board.trim()) return;
    const trimmed = board.trim();
    if (!formData.examBoards.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        examBoards: [...prev.examBoards, trimmed],
      }));
      setBoardError("");
    }
  };

  const removeExamBoard = (boardToRemove) => {
    setFormData((prev) => ({
      ...prev,
      examBoards: prev.examBoards.filter((b) => b !== boardToRemove),
    }));
  };

  const handleAddCustomBoard = () => {
    if (customBoardInput.trim()) {
      addExamBoard(customBoardInput.trim());
      setCustomBoardInput("");
      setShowCustomInput(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadFileToCloudinary = async (file, folder) => {
    const data = new FormData();
    data.append("file", file);
    data.append("folder", folder);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || `Failed to upload ${file.name}`);
    }

    const json = await res.json();
    return json.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.examBoards.length === 0) {
      setBoardError("Please select or add at least one exam board.");
      return;
    }

    if (!formData.availabilityHours) {
      setSubmitError("Please select your target weekly teaching commitment.");
      return;
    }

    if (formData.availabilitySlots.length === 0) {
      setSubmitError("Please select at least one preferred teaching time slot.");
      return;
    }

    if (!cvFile) {
      setSubmitError("Please upload your CV / Resume before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      let photoUrl = "";
      let cvUrl = "";

      if (photoFile) {
        photoUrl = await uploadFileToCloudinary(photoFile, "careers_photos");
      }

      if (cvFile) {
        cvUrl = await uploadFileToCloudinary(cvFile, "careers_cvs");
      }

      const formattedAvailability = `${formData.availabilityHours} • Slots: ${formData.availabilitySlots.join(", ")}`;

      const res = await fetch("/api/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          availability: formattedAvailability,
          photoUrl,
          cvUrl,
          cvType: cvFile ? cvFile.name.split(".").pop().toLowerCase() : "",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Career application submission error:", err);
      setSubmitError(
        err.message || "Could not submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files?.[0]) setPhotoFile(e.target.files[0]);
  };

  const handleCvChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      const allowedExts = ['pdf', 'doc', 'docx'];
      
      if (allowedExts.includes(ext)) {
        setCvFile(file);
        setSubmitError("");
      } else {
        setCvFile(null);
        setSubmitError("Invalid file type. Please upload your CV as a .pdf, .doc, or .docx file.");
      }
    }
  };

  const requirements = [
    "Minimum 2 years of teaching experience in your subject area",
    "Familiarity with at least one major exam board (Edexcel, CAIE, AQA, IB)",
    "Strong command of English (written and spoken)",
    "Reliable internet connection and quiet teaching environment",
    "Willingness to undergo a diagnostic session with our Academic Director",
  ];

  const perks = [
    {
      title: "Competitive Pay",
      desc: "Above-market hourly rates with performance bonuses tied to student grade improvements.",
    },
    {
      title: "Academic Freedom",
      desc: "Teach using our mark-scheme-first methodology — no micromanagement, just results.",
    },
    {
      title: "Small Class Sizes",
      desc: "1:1 and small groups only. You know every student by name.",
    },
    {
      title: "Flexible Schedule",
      desc: "Set your own hours across GST, PKT, and GMT time zones.",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="w-full bg-[#faf8f2] text-on-background min-h-screen grain-bg">
        <section className="py-24 md:py-32 px-6 max-w-container-max mx-auto">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-on-background neo-brutalist-shadow">
              <CheckCircle2 className="w-10 h-10 text-on-background" />
            </div>
            <h1 className="font-['Archivo_Black'] text-3xl md:text-4xl text-on-background mb-4">
              Application Received!
            </h1>
            <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant leading-relaxed mb-8">
              Thank you <strong>{formData.fullName || "there"}</strong>. Our
              Academic Director will review your application and respond within{" "}
              <strong>3–5 working days</strong>. Shortlisted candidates will be
              invited for a diagnostic teaching session.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    country: "",
                    city: "",
                    subject: "",
                    levels: "",
                    experience: "",
                    examBoards: [],
                    availabilityHours: "",
                    availabilitySlots: [],
                    about: "",
                  });
                  setPhotoFile(null);
                  setCvFile(null);
                }}
                className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm px-8 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5"
              >
                Submit Another Application
              </button>
              <Link
                href="/"
                className="bg-transparent text-on-background font-['Work_Sans'] font-extrabold text-sm px-8 py-4 rounded-full border-2 border-on-background hover:bg-white/60 transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#faf8f2] text-on-background min-h-screen grain-bg">
      {/* Page Header / Hero Section */}
      <section className="py-10 md:py-16 px-6 border-b-2 border-line bg-[#f5f2e9]/70 relative overflow-hidden">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#c0392b]"></span> Join Our Faculty
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success/10 border border-success/30 font-['IBM_Plex_Mono'] text-[10px] font-bold text-success-dark">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                  Hiring Active
                </span>
              </div>

              <h1 className="font-['Archivo_Black'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-on-background leading-[1.1] tracking-tight">
                Teach with{" "}
                <span className="relative inline-block text-on-background">
                  Alinea
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 text-[#c0392b]"
                    viewBox="0 0 100 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 C 30 2, 70 10, 98 4"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="font-['Work_Sans'] text-sm sm:text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                We&apos;re looking for experienced, exam-board-literate teachers who
                care about grade outcomes — not just lesson delivery. If you know
                the mark scheme inside out, we want to hear from you.
              </p>

              {/* Quick Perks Pill Strip */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1 font-['IBM_Plex_Mono'] text-xs font-semibold px-3 py-1 bg-white/80 rounded-lg border border-line text-on-background">
                  ✓ Above-Market Pay
                </span>
                <span className="inline-flex items-center gap-1 font-['IBM_Plex_Mono'] text-xs font-semibold px-3 py-1 bg-white/80 rounded-lg border border-line text-on-background">
                  ✓ 1:1 &amp; Small Groups
                </span>
                <span className="inline-flex items-center gap-1 font-['IBM_Plex_Mono'] text-xs font-semibold px-3 py-1 bg-white/80 rounded-lg border border-line text-on-background">
                  ✓ Flexible Remote Hours
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#apply"
                  className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm px-7 py-3.5 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Apply Now</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
                <a
                  href="#requirements"
                  className="bg-white/80 hover:bg-white text-on-background font-['Work_Sans'] font-extrabold text-sm px-6 py-3.5 rounded-full border-2 border-on-background transition-colors duration-200"
                >
                  View Requirements
                </a>
              </div>
            </div>

            {/* Right Column: Notebook / Rubric Visual */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <TeacherRubricVisual />
            </div>
          </div>

          {/* Bottom subtle scroll cue */}
          <div className="mt-8 pt-4 border-t border-line/60 flex items-center justify-between font-['IBM_Plex_Mono'] text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c0392b]" />
              <span>Applications reviewed within 3–5 working days</span>
            </span>
            <a
              href="#requirements"
              className="inline-flex items-center gap-1 hover:text-on-background transition-colors font-bold group"
            >
              <span>Scroll to explore</span>
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Why Teach With Us + Requirements */}
      <section id="requirements" className="py-14 md:py-20 px-6 max-w-container-max mx-auto scroll-mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* What We Offer */}
          <div>
            <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#c0392b]"></span> What We Offer
            </span>
            <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl text-on-background mb-8">
              Why teachers choose Alinea.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {perks.map((perk, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 rounded-2xl p-5 border border-line"
                >
                  <span className="font-['IBM_Plex_Mono'] font-bold text-lg text-[#c0392b] block mb-2">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-['Work_Sans'] font-bold text-on-background text-base mb-1">
                    {perk.title}
                  </h3>
                  <p className="font-['Work_Sans'] text-sm text-on-surface-variant leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#c0392b]"></span> What We Look For
            </span>
            <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl text-on-background mb-8">
              Minimum requirements.
            </h2>
            <div className="bg-white/80 rounded-2xl p-6 md:p-8 border border-line">
              <ul className="flex flex-col gap-4">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#c0392b] font-bold text-base leading-none mt-0.5">
                      ✓
                    </span>
                    <span className="font-['Work_Sans'] text-sm text-on-background leading-relaxed">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process Steps */}
            <div className="mt-8 bg-[#f5f2e9] rounded-2xl p-6 md:p-8 border border-line">
              <h3 className="font-['Archivo_Black'] text-base text-on-background mb-4 uppercase tracking-wider">
                Hiring Process
              </h3>
              <div className="flex flex-col gap-4 font-['Work_Sans'] text-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-on-background">
                      Submit Application
                    </strong>
                    <p className="text-on-surface-variant">
                      Fill out the form below with your details and CV.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-on-background">
                      Academic Director Review
                    </strong>
                    <p className="text-on-surface-variant">
                      Khawar personally reviews every application.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-on-background">
                      Diagnostic Teaching Session
                    </strong>
                    <p className="text-on-surface-variant">
                      A live 30-min mock lesson to assess teaching quality.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-on-background">
                      Onboarding & First Students
                    </strong>
                    <p className="text-on-surface-variant">
                      Match with students and begin teaching within a week.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="apply" className="border-t-2 border-line pt-16 scroll-mt-10">
          <div className="max-w-3xl mx-auto">
            <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#c0392b]"></span> Apply Now
            </span>
            <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-on-background mb-2">
              Teacher Application Form
            </h2>
            <p className="font-['Work_Sans'] text-sm text-on-surface-variant mb-10">
              All fields marked with * are required. Applications are reviewed
              within 3–5 working days.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Section 1: Personal Information */}
              <div>
                <h3 className="font-['Archivo_Black'] text-sm uppercase tracking-wider text-on-background mb-5 pb-2 border-b border-line">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Ahmed Raza Khan"
                      className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+92 300 123 4567"
                      className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select your country</option>
                      <option>Pakistan</option>
                      <option>United Arab Emirates</option>
                      <option>Saudi Arabia</option>
                      <option>Qatar</option>
                      <option>Bahrain</option>
                      <option>Kuwait</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Bangladesh</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Lahore, Dubai, London"
                      className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Teaching Profile */}
              <div>
                <h3 className="font-['Archivo_Black'] text-sm uppercase tracking-wider text-on-background mb-5 pb-2 border-b border-line">
                  Teaching Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                      Subject(s) You Teach *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select primary subject</option>
                      <option>Economics</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Biology</option>
                      <option>Chemistry</option>
                      <option>English Language</option>
                      <option>English Literature</option>
                      <option>Business Studies</option>
                      <option>Accounting</option>
                      <option>Computer Science</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                      Level(s) *
                    </label>
                    <select
                      name="levels"
                      value={formData.levels}
                      onChange={handleChange}
                      required
                      className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select level</option>
                      <option>IGCSE / O-Level Only</option>
                      <option>A-Level Only</option>
                      <option>Both IGCSE &amp; A-Level</option>
                      <option>IB Diploma (SL/HL)</option>
                      <option>All of the above</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                      Years of Teaching Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select experience</option>
                      <option>1–2 years</option>
                      <option>3–5 years</option>
                      <option>5–10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                  {/* Boards You Teach - True Multi-select Tags/Checkboxes */}
                  <div className="flex flex-col gap-2.5 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                        Boards You Teach *
                      </label>
                      {formData.examBoards.length > 0 ? (
                        <span className="text-[11px] font-semibold text-[#c0392b] bg-[#c0392b]/10 px-2 py-0.5 rounded-md">
                          {formData.examBoards.length} board
                          {formData.examBoards.length > 1 ? "s" : ""} selected
                        </span>
                      ) : (
                        <span className="text-[11px] text-muted font-medium">
                          Select all that apply
                        </span>
                      )}
                    </div>

                    {/* True Multi-select Interactive Tags/Checkboxes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {presetBoards.map((board) => {
                        const isSelected = formData.examBoards.includes(board);
                        return (
                          <button
                            key={board}
                            type="button"
                            onClick={() => toggleExamBoard(board)}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left font-['Work_Sans'] text-xs font-bold transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-on-background text-white border-on-background shadow-[3px_3px_0_0_rgba(25,28,29,0.3)]"
                                : "bg-white text-on-background border-line hover:border-on-background/50 hover:bg-[#faf8f2]"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-[#c0392b] border-[#c0392b] text-white"
                                  : "border-muted bg-white"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3 h-3 stroke-3" />
                              )}
                            </div>
                            <span className="truncate">{board}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Board / Other Added Tags */}
                    {formData.examBoards.some(
                      (b) => !presetBoards.includes(b),
                    ) && (
                      <div className="flex flex-wrap gap-2 pt-1 items-center">
                        <span className="text-[11px] font-['Work_Sans'] font-bold uppercase tracking-wider text-muted mr-1">
                          Other Added:
                        </span>
                        {formData.examBoards
                          .filter((b) => !presetBoards.includes(b))
                          .map((customBoard) => (
                            <span
                              key={customBoard}
                              className="inline-flex items-center gap-1.5 bg-on-background text-white font-['Work_Sans'] font-bold text-xs px-3 py-1.5 rounded-lg border-2 border-on-background shadow-xs"
                            >
                              <span>{customBoard}</span>
                              <button
                                type="button"
                                onClick={() => removeExamBoard(customBoard)}
                                className="text-white/70 hover:text-white p-0.5 rounded-md transition-colors cursor-pointer"
                                title={`Remove ${customBoard}`}
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Other / Custom Board Input Toggle */}
                    <div className="pt-1">
                      {showCustomInput ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={customBoardInput}
                            onChange={(e) =>
                              setCustomBoardInput(e.target.value)
                            }
                            placeholder="Enter exam board (e.g. Scottish Highers, CBSE, SAT)"
                            className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-2.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none flex-1"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddCustomBoard();
                              }
                            }}
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleAddCustomBoard}
                            className="bg-[#c0392b] text-white font-['Work_Sans'] font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-[#a02e22] transition-colors cursor-pointer shrink-0"
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCustomInput(false);
                              setCustomBoardInput("");
                            }}
                            className="text-on-surface-variant hover:text-on-background p-2"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowCustomInput(true)}
                          className="inline-flex items-center gap-1.5 font-['Work_Sans'] font-bold text-xs text-on-surface-variant hover:text-on-background border border-dashed border-muted hover:border-on-background px-3 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Other / Custom Board</span>
                        </button>
                      )}
                    </div>

                    {boardError && (
                      <p className="font-['Work_Sans'] text-xs text-[#c0392b] font-bold mt-1">
                        {boardError}
                      </p>
                    )}
                  </div>
                  {/* Structured Weekly Availability */}
                  <div className="flex flex-col gap-4 sm:col-span-2 bg-[#fbf9f4] p-5 rounded-2xl border border-line">
                    <div className="flex items-center justify-between">
                      <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                        Weekly Availability &amp; Teaching Schedule *
                      </label>
                      {formData.availabilitySlots.length > 0 && (
                        <span className="text-[11px] font-semibold text-[#c0392b] bg-[#c0392b]/10 px-2 py-0.5 rounded-md">
                          {formData.availabilitySlots.length} slot
                          {formData.availabilitySlots.length > 1 ? "s" : ""} selected
                        </span>
                      )}
                    </div>

                    {/* Commitment Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-['Work_Sans'] font-medium text-xs text-on-surface-variant">
                        Target Hours Commitment *
                      </label>
                      <select
                        name="availabilityHours"
                        value={formData.availabilityHours}
                        onChange={handleChange}
                        required
                        className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select weekly commitment</option>
                        <option>5–10 hours / week (Part-time)</option>
                        <option>10–20 hours / week (Regular / Standard)</option>
                        <option>20–30 hours / week (High Commitment)</option>
                        <option>30+ hours / week (Full-time)</option>
                      </select>
                    </div>

                    {/* Preferred Teaching Time Slots */}
                    <div className="flex flex-col gap-2">
                      <label className="font-['Work_Sans'] font-medium text-xs text-on-surface-variant">
                        Preferred Teaching Slots (Select all that apply) *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {presetSlots.map((slot) => {
                          const isSelected = formData.availabilitySlots.includes(slot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => toggleAvailabilitySlot(slot)}
                              className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left font-['Work_Sans'] text-xs font-bold transition-all cursor-pointer select-none ${
                                isSelected
                                  ? "bg-on-background text-white border-on-background shadow-[3px_3px_0_0_rgba(25,28,29,0.3)]"
                                  : "bg-white text-on-background border-line hover:border-on-background/50 hover:bg-[#faf8f2]"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? "bg-[#c0392b] border-[#c0392b] text-white"
                                    : "border-muted bg-white"
                                }`}
                              >
                                {isSelected && (
                                  <Check className="w-3 h-3 stroke-3" />
                                )}
                              </div>
                              <span className="truncate">{slot}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: About You */}
              <div>
                <h3 className="font-['Archivo_Black'] text-sm uppercase tracking-wider text-on-background mb-5 pb-2 border-b border-line">
                  About You
                </h3>
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                    Brief Introduction *
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your teaching philosophy, notable student outcomes, and why you want to teach with Alinea..."
                    className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Section 4: File Uploads */}
              <div>
                <h3 className="font-['Archivo_Black'] text-sm uppercase tracking-wider text-on-background mb-5 pb-2 border-b border-line">
                  Uploads
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Photo Upload */}
                  <div>
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant block mb-2">
                      Profile Photo
                    </label>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="w-full bg-white border-2 border-dashed border-line rounded-xl p-6 flex flex-col items-center gap-3 hover:border-on-background/40 transition-colors cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#f5f2e9] border border-line flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                        <Camera className="w-5 h-5 text-on-surface-variant" />
                      </div>
                      {photoFile ? (
                        <span className="font-['Work_Sans'] text-sm text-on-background font-bold truncate max-w-full">
                          {photoFile.name}
                        </span>
                      ) : (
                        <>
                          <span className="font-['Work_Sans'] text-sm text-on-surface-variant">
                            Click to upload photo
                          </span>
                          <span className="font-['IBM_Plex_Mono'] text-xs text-muted">
                            JPG, PNG · Max 5MB
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant block mb-2">
                      CV / Resume *
                    </label>
                    <input
                      ref={cvInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => cvInputRef.current?.click()}
                      className="w-full bg-white border-2 border-dashed border-line rounded-xl p-6 flex flex-col items-center gap-3 hover:border-on-background/40 transition-colors cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#f5f2e9] border border-line flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                        <FileText className="w-5 h-5 text-on-surface-variant" />
                      </div>
                      {cvFile ? (
                        <span className="font-['Work_Sans'] text-sm text-on-background font-bold truncate max-w-full">
                          {cvFile.name}
                        </span>
                      ) : (
                        <>
                          <span className="font-['Work_Sans'] text-sm text-on-surface-variant">
                            Click to upload CV
                          </span>
                          <span className="font-['IBM_Plex_Mono'] text-xs text-muted">
                            PDF, DOC · Max 10MB
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit & Error display */}
              <div className="pt-4 flex flex-col gap-3">
                {submitError && (
                  <p className="font-['Work_Sans'] text-sm text-[#c0392b] font-bold bg-[#c0392b]/10 p-3.5 rounded-xl border border-[#c0392b]/30">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm px-10 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed w-max"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </button>
                <p className="font-['Work_Sans'] text-xs text-muted mt-2">
                  By submitting, you agree to Alinea&apos;s recruitment terms.
                  We&apos;ll only use your data for the hiring process.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
