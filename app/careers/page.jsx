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
} from "lucide-react";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
    availability: "",
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
    "Edexcel (Pearson)",
    "Cambridge (CAIE)",
    "AQA",
    "OCR",
    "IB (International Baccalaureate)",
    "AP (Advanced Placement)",
  ];

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

  const handleSelectBoard = (e) => {
    const val = e.target.value;
    if (val === "Custom") {
      setShowCustomInput(true);
    } else if (val) {
      addExamBoard(val);
      setShowCustomInput(false);
    }
    e.target.value = "";
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

      const docRef = await addDoc(collection(db, "career_applications"), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        subject: formData.subject,
        levels: formData.levels,
        experience: formData.experience,
        examBoards: formData.examBoards,
        availability: formData.availability,
        about: formData.about,
        photoUrl: photoUrl,
        cvUrl: cvUrl,
        createdAt: serverTimestamp(),
        status: "unread",
      });

      console.log("Career application saved to Firestore with ID:", docRef.id);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Career application submission error:", err);
      const detail = err.code ? `[${err.code}] ${err.message}` : err.message;
      setSubmitError(
        `Submission failed: ${detail || "Could not submit application."}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files?.[0]) setPhotoFile(e.target.files[0]);
  };

  const handleCvChange = (e) => {
    if (e.target.files?.[0]) setCvFile(e.target.files[0]);
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
                    availability: "",
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
      {/* Page Header */}
      <section className="py-16 md:py-24 px-6 border-b-2 border-line bg-[#f5f2e9]/60">
        <div className="max-w-container-max mx-auto">
          <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-4">
            <span className="w-5 h-0.5 bg-[#c0392b]"></span> Join Our Team
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl sm:text-5xl md:text-6xl text-on-background mb-4 leading-tight">
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
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            We&apos;re looking for experienced, exam-board-literate teachers who
            care about grade outcomes — not just lesson delivery. If you know
            the mark scheme inside out, we want to hear from you.
          </p>
        </div>
      </section>

      {/* Why Teach With Us + Requirements */}
      <section className="py-16 md:py-20 px-6 max-w-container-max mx-auto">
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
        <div className="border-t-2 border-line pt-16">
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
                  {/* Exam Boards Familiar With - Multi-select */}
                  <div className="flex flex-col gap-2.5 sm:col-span-2">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant flex items-center justify-between">
                      <span>Exam Boards Familiar With *</span>
                      {formData.examBoards.length > 0 && (
                        <span className="text-[11px] font-semibold text-[#c0392b]">
                          {formData.examBoards.length} board
                          {formData.examBoards.length > 1 ? "s" : ""} selected
                        </span>
                      )}
                    </label>

                    {/* Selected Exam Boards Badges/Pills */}
                    {formData.examBoards.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 bg-white border-2 border-line rounded-xl min-h-[50px] items-center">
                        {formData.examBoards.map((board, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 bg-[#f5f2e9] text-on-background font-['Work_Sans'] font-extrabold text-xs px-3 py-1.5 rounded-lg border border-line shadow-xs group"
                          >
                            <span>{board}</span>
                            <button
                              type="button"
                              onClick={() => removeExamBoard(board)}
                              className="text-on-surface-variant hover:text-[#c0392b] p-0.5 rounded-md hover:bg-white transition-colors cursor-pointer"
                              title={`Remove ${board}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Controls: Dropdown Select + Custom Input */}
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <select
                          value=""
                          onChange={handleSelectBoard}
                          className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background focus:border-on-background focus:outline-none transition-colors cursor-pointer flex-1"
                        >
                          <option value="">+ Add an Exam Board...</option>
                          {presetBoards.map((b) => (
                            <option
                              key={b}
                              value={b}
                              disabled={formData.examBoards.includes(b)}
                            >
                              {b}{" "}
                              {formData.examBoards.includes(b)
                                ? "✓ (Added)"
                                : ""}
                            </option>
                          ))}
                          <option value="Custom">
                            + Other / Custom Board...
                          </option>
                        </select>
                      </div>

                      {/* Custom Board text input if requested */}
                      {showCustomInput && (
                        <div className="flex gap-2 items-center mt-1">
                          <input
                            type="text"
                            value={customBoardInput}
                            onChange={(e) =>
                              setCustomBoardInput(e.target.value)
                            }
                            placeholder="Enter exam board name (e.g. WJEC, Scottish Highers)"
                            className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none flex-1"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddCustomBoard();
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleAddCustomBoard}
                            className="bg-[#c0392b] text-white font-['Work_Sans'] font-bold text-xs px-4 py-3 rounded-xl hover:bg-[#a02e22] transition-colors cursor-pointer shrink-0"
                          >
                            Add Board
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
                      )}

                      {/* Quick Add Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-['Work_Sans'] font-bold uppercase tracking-wider text-muted mr-1">
                          Quick add:
                        </span>
                        {presetBoards.map((board) => {
                          const isAdded = formData.examBoards.includes(board);
                          return (
                            <button
                              key={board}
                              type="button"
                              onClick={() =>
                                isAdded
                                  ? removeExamBoard(board)
                                  : addExamBoard(board)
                              }
                              className={`font-['Work_Sans'] text-xs font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                                isAdded
                                  ? "bg-on-background text-white border-on-background shadow-xs"
                                  : "bg-white text-on-surface-variant border-line hover:border-on-background/40 hover:bg-[#f5f2e9]"
                              }`}
                            >
                              {isAdded ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Plus className="w-3 h-3 text-on-surface-variant" />
                              )}
                              {board}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {boardError && (
                      <p className="font-['Work_Sans'] text-xs text-[#c0392b] font-bold mt-1">
                        {boardError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                      Weekly Availability
                    </label>
                    <input
                      type="text"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="e.g. Mon–Fri 4PM–9PM GST, Weekends flexible"
                      className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors"
                    />
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
