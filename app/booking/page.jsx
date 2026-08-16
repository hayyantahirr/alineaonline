"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  CheckCircle2,
  User,
  Sparkles,
  Clock,
  Calendar,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { subjectsData } from "@/data/subjectsData";
import { facultyMembers } from "@/data/facultyData";

// Helper to find teacher from URL param or name
const findTeacherByParam = (param) => {
  if (!param) return null;
  const lower = param.toLowerCase();
  return facultyMembers.find(
    (t) =>
      t.name.toLowerCase().includes(lower) ||
      lower.includes(t.name.toLowerCase()) ||
      t.id === lower,
  );
};

// Helper to find subject from URL param or name
const findSubjectByParam = (param) => {
  if (!param) return subjectsData[0];
  const lower = param.toLowerCase();
  return (
    subjectsData.find(
      (s) =>
        s.id.toLowerCase() === lower ||
        s.title.toLowerCase().includes(lower) ||
        lower.includes(s.title.toLowerCase()),
    ) || subjectsData[0]
  );
};

// Helper to find lead teacher for a given subject
const getLeadTeacherForSubject = (subjectObj) => {
  if (!subjectObj) return facultyMembers[0];
  const leadNameFirstWord = subjectObj.tutor
    ? subjectObj.tutor.split(" ")[0].toLowerCase()
    : "";
  const found = facultyMembers.find(
    (f) =>
      f.name.toLowerCase().includes(leadNameFirstWord) ||
      f.subject
        .toLowerCase()
        .includes(subjectObj.title.toLowerCase().split(" ")[0]) ||
      (f.subjectBookingParam &&
        subjectObj.title
          .toLowerCase()
          .includes(f.subjectBookingParam.toLowerCase())),
  );
  return found || facultyMembers[0];
};

function BookingContent() {
  const searchParams = useSearchParams();
  const teacherParam = searchParams.get("teacher");
  const subjectParam = searchParams.get("subject");
  const levelParam = searchParams.get("level");

  // Initial State derived dynamically from parameters or defaults
  const [selectedSubject, setSelectedSubject] = useState(() =>
    findSubjectByParam(subjectParam),
  );
  const [selectedTeacher, setSelectedTeacher] = useState(() => {
    const fromTeacherParam = findTeacherByParam(teacherParam);
    if (fromTeacherParam) return fromTeacherParam;
    const initialSub = findSubjectByParam(subjectParam);
    return getLeadTeacherForSubject(initialSub);
  });

  // Current Level Object (derived from selectedSubject)
  const currentLevels = selectedSubject.levels || [];
  const [selectedLevelLabel, setSelectedLevelLabel] = useState(
    () => levelParam || currentLevels[0]?.label || "A-Level",
  );

  // Active level object derived
  const activeLevelObj =
    currentLevels.find((l) => l.label === selectedLevelLabel) ||
    currentLevels[0] || { boards: [] };

  // Current Boards for active level
  const currentBoards = activeLevelObj.boards || [];
  const [selectedBoardLabel, setSelectedBoardLabel] = useState(
    () => currentBoards[0]?.label || "Edexcel (Pearson)",
  );

  const [selectedFormat, setSelectedFormat] = useState(
    "1:1 Intensive Mentorship",
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    "4:00 PM - 5:30 PM GST (Dubai)",
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    targetGrade: "A*",
    additionalNotes: "",
  });

  // Synchronize URL search params if they change dynamically
  useEffect(() => {
    if (teacherParam) {
      const t = findTeacherByParam(teacherParam);
      if (t) {
        setSelectedTeacher(t);
        // Find subject matching teacher
        const matchingSub = subjectsData.find(
          (s) =>
            s.title
              .toLowerCase()
              .includes(t.subjectBookingParam?.toLowerCase() || "") ||
            t.subject
              .toLowerCase()
              .includes(s.title.toLowerCase().split(" ")[0]),
        );
        if (matchingSub) setSelectedSubject(matchingSub);
      }
    } else if (subjectParam) {
      const s = findSubjectByParam(subjectParam);
      setSelectedSubject(s);
      const lead = getLeadTeacherForSubject(s);
      setSelectedTeacher(lead);
    }
  }, [teacherParam, subjectParam]);

  // Keep Level and Board valid when Subject changes
  useEffect(() => {
    if (selectedSubject && selectedSubject.levels?.length > 0) {
      const firstLevel = selectedSubject.levels[0];
      setSelectedLevelLabel(firstLevel.label);
      if (firstLevel.boards?.length > 0) {
        setSelectedBoardLabel(firstLevel.boards[0].label);
      }
    }
  }, [selectedSubject]);

  // Keep Board valid when Level changes
  useEffect(() => {
    if (activeLevelObj && activeLevelObj.boards?.length > 0) {
      setSelectedBoardLabel(activeLevelObj.boards[0].label);
    }
  }, [selectedLevelLabel]);

  // Handler when user selects a Subject button
  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    const leadTeacher = getLeadTeacherForSubject(subject);
    setSelectedTeacher(leadTeacher);
  };

  // Handler when user selects a Teacher dropdown
  const handleSelectTeacher = (teacherId) => {
    const t = facultyMembers.find((f) => f.id === teacherId);
    if (!t) return;
    setSelectedTeacher(t);

    // Auto-select corresponding subject if available
    const matchingSub = subjectsData.find(
      (s) =>
        s.title
          .toLowerCase()
          .includes(t.subjectBookingParam?.toLowerCase() || "") ||
        t.subject.toLowerCase().includes(s.title.toLowerCase().split(" ")[0]),
    );
    if (matchingSub) {
      setSelectedSubject(matchingSub);
    }
  };

  // Form submission handler communicating with POST /api/booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        parentName: formData.parentName,
        studentName: formData.studentName,
        email: formData.email,
        phone: formData.phone,
        subject: selectedSubject.title,
        level: selectedLevelLabel,
        examBoard: selectedBoardLabel,
        teacherName: selectedTeacher?.name || "Unassigned Specialist",
        teacherRole: selectedTeacher?.role || "Subject Specialist",
        sessionFormat: selectedFormat,
        timeSlot: selectedTimeSlot,
        targetGrade: formData.targetGrade || "A*",
        additionalNotes: formData.additionalNotes || "",
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit booking request.");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeBoardObj = currentBoards.find(
    (b) => b.label === selectedBoardLabel,
  );

  return (
    <div className="w-full bg-[#faf8f2] text-on-background grain-bg min-h-screen">
      {/* Header */}
      <section className="bg-on-background text-white py-14 px-6 border-b-4 border-primary-container">
        <div className="max-w-container-max mx-auto text-center">
          <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            RESERVE YOUR ACADEMIC CONSULTATION
          </span>
          <h1 className="font-['Archivo_Black'] text-3xl md:text-5xl text-primary-container mt-4 mb-3">
            {selectedTeacher
              ? `Book a Session with ${selectedTeacher.name}`
              : `Book Your ${selectedSubject.title} Consultation`}
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-surface-variant max-w-2xl mx-auto leading-relaxed">
            Select your target subject, preferred examiner specialist, and time
            slot below. Our academic team will manually confirm your trial
            session within 2 hours.
          </p>
        </div>
      </section>

      {/* Main Booking Container */}
      <section className="py-12 md:py-18 px-6 max-w-container-max mx-auto">
        {isSubmitted ? (
          <div className="bg-primary-container text-on-background p-8 md:p-14 rounded-3xl border-2 border-on-background neo-brutalist-shadow text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-on-background text-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary-container" />
            </div>
            <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl mb-3">
              Consultation Request Received!
            </h2>
            <p className="font-['Work_Sans'] text-base text-on-primary-container leading-relaxed mb-6">
              Thank you <strong>{formData.parentName || "there"}</strong>. Our
              senior academic coordinator will reach out to you via WhatsApp /
              email within <strong>2 hours</strong> to confirm your{" "}
              <strong>
                {selectedSubject.title} ({selectedLevelLabel})
              </strong>{" "}
              session slot with <strong>{selectedTeacher?.name}</strong>.
            </p>

            <div className="bg-white/80 rounded-2xl p-5 border border-on-background mb-6 text-left font-['Work_Sans'] text-xs text-on-surface-variant space-y-2">
              <p className="flex items-center gap-2 text-on-background font-bold">
                <Clock className="w-4 h-4 text-[#c0392b]" />
                Preferred Slot: {selectedTimeSlot}
              </p>
              <p className="flex items-center gap-2 text-on-background font-bold">
                <BookOpen className="w-4 h-4 text-[#c0392b]" />
                Exam Board: {selectedBoardLabel}{" "}
                {activeBoardObj?.syllabus ? `(${activeBoardObj.syllabus})` : ""}
              </p>
              <p className="text-muted pt-1">
                🔒 Saved in real time to Firestore. No payment is required today.
              </p>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setErrorMessage("");
                setFormData({
                  parentName: "",
                  studentName: "",
                  email: "",
                  phone: "",
                  targetGrade: "A*",
                  additionalNotes: "",
                });
              }}
              className="bg-on-background text-white font-['Work_Sans'] font-bold text-sm px-8 py-3.5 rounded-full border border-white hover:bg-black transition-colors cursor-pointer"
            >
              Book Another Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border-2 border-on-background bento-shadow">
              {/* Error Message Alert */}
              {errorMessage && (
                <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-4 mb-6 flex items-center gap-3 text-red-700 font-['Work_Sans'] text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Dynamic Teacher Badge Banner */}
              {selectedTeacher && (
                <div className="bg-[#f5f2e9] border-2 border-on-background rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-on-background shrink-0 relative">
                      <Image
                        src={selectedTeacher.image}
                        alt={selectedTeacher.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase text-[#c0392b] tracking-wider">
                          ASSIGNED FACULTY SPECIALIST
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 font-['IBM_Plex_Mono'] text-[9px] font-bold px-2 py-0.2 rounded-full border ${
                            selectedTeacher.availabilityStatus === "available"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-amber-50 text-amber-800 border-amber-300"
                          }`}
                        >
                          ● {selectedTeacher.availability}
                        </span>
                      </div>
                      <h4 className="font-['Archivo_Black'] text-lg text-on-background flex items-center gap-2">
                        {selectedTeacher.name}
                        <span className="font-['Work_Sans'] text-xs font-normal text-on-surface-variant">
                          ({selectedTeacher.qualification})
                        </span>
                      </h4>
                      <p className="font-['Work_Sans'] text-xs text-on-surface-variant">
                        {selectedTeacher.role} · {selectedTeacher.experience}{" "}
                        Exp.
                      </p>
                    </div>
                  </div>

                  {/* Change Teacher Dropdown */}
                  <div className="w-full sm:w-auto">
                    <label className="block font-['IBM_Plex_Mono'] text-[10px] uppercase font-bold text-on-surface-variant mb-1">
                      Switch Specialist:
                    </label>
                    <select
                      value={selectedTeacher.id}
                      onChange={(e) => handleSelectTeacher(e.target.value)}
                      className="w-full sm:w-auto p-2 bg-white border border-on-background rounded-xl font-['Work_Sans'] text-xs font-bold focus:outline-none cursor-pointer"
                    >
                      {facultyMembers.map((fac) => (
                        <option key={fac.id} value={fac.id}>
                          {fac.name} ({fac.subject.split(" ")[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Target Subject Selection (Dynamic from subjectsData) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-['Archivo_Black'] text-lg text-on-background">
                      1. Select Target Subject
                    </label>
                    <span className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant">
                      {subjectsData.length} Subjects Available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {subjectsData.map((sub) => {
                      const isSelected = selectedSubject.id === sub.id;

                      return (
                        <button
                          type="button"
                          key={sub.id}
                          onClick={() => handleSelectSubject(sub)}
                          className={`p-3.5 rounded-xl border-2 font-['Work_Sans'] font-bold text-xs md:text-sm text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                            isSelected
                              ? "bg-primary-container border-on-background text-on-background neo-brutalist-shadow"
                              : "bg-background border-line text-on-surface-variant hover:bg-surface-container hover:border-on-background/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold text-[#c0392b]">
                              {sub.num}
                            </span>
                            {sub.badgeType === "red-outline" && (
                              <span className="font-['IBM_Plex_Mono'] text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-[#c0392b] text-[#c0392b]">
                                {sub.tag}
                              </span>
                            )}
                          </div>
                          <span className="line-clamp-1">{sub.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Dynamic Levels & Exam Boards (Derived from selectedSubject) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant mb-2">
                      Academic Level * (Dynamic for {selectedSubject.title})
                    </label>
                    <select
                      value={selectedLevelLabel}
                      onChange={(e) => setSelectedLevelLabel(e.target.value)}
                      className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      {currentLevels.map((lvl) => (
                        <option key={lvl.id} value={lvl.label}>
                          {lvl.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant mb-2">
                      Exam Board * (Dynamic for {selectedLevelLabel})
                    </label>
                    <select
                      value={selectedBoardLabel}
                      onChange={(e) => setSelectedBoardLabel(e.target.value)}
                      className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      {currentBoards.map((brd) => (
                        <option key={brd.id} value={brd.label}>
                          {brd.label}{" "}
                          {brd.syllabus ? `(Syllabus ${brd.syllabus})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Modules Preview Badge */}
                {activeBoardObj?.modules &&
                  activeBoardObj.modules.length > 0 && (
                    <div className="bg-[#f5f2e9]/70 rounded-2xl p-4 border border-line space-y-2">
                      <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase font-bold text-[#c0392b] tracking-wider block">
                        Target Curriculum Modules ({selectedBoardLabel}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeBoardObj.modules.map((mod, idx) => (
                          <span
                            key={idx}
                            className="font-['Work_Sans'] text-xs bg-white px-2.5 py-1 rounded-lg border border-line text-on-background font-medium"
                          >
                            • {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Step 3: Session Format */}
                <div>
                  <label className="block font-['Archivo_Black'] text-base text-on-background mb-3">
                    2. Preferred Session Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "1:1 Intensive Mentorship",
                        desc: `Personalized 1:1 focus with ${selectedTeacher?.name || "Specialist"}`,
                      },
                      {
                        title: "Small Group Masterclass (Max 4)",
                        desc: "Peer discussion & collaborative past-paper drills",
                      },
                    ].map((fmt) => (
                      <div
                        key={fmt.title}
                        onClick={() => setSelectedFormat(fmt.title)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          selectedFormat === fmt.title
                            ? "bg-primary-container/25 border-on-background shadow-xs"
                            : "bg-background border-line hover:border-on-background/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-['Work_Sans'] font-bold text-sm text-on-background">
                            {fmt.title}
                          </span>
                          <input
                            type="radio"
                            name="format"
                            checked={selectedFormat === fmt.title}
                            onChange={() => setSelectedFormat(fmt.title)}
                            className="accent-[#c0392b]"
                          />
                        </div>
                        <p className="font-['Work_Sans'] text-xs text-on-surface-variant">
                          {fmt.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 4: Time Slot */}
                <div>
                  <label className="block font-['Archivo_Black'] text-base text-on-background mb-2">
                    3. Select Preferred Time Slot (GST / UAE &amp; PKT Friendly)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "2:00 PM - 3:30 PM GST (Dubai)",
                      "4:00 PM - 5:30 PM GST (Dubai)",
                      "6:00 PM - 7:30 PM GST (Dubai)",
                      "8:00 PM - 9:30 PM GST (Dubai)",
                    ].map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3 rounded-xl border-2 font-['IBM_Plex_Mono'] text-xs text-left transition-all cursor-pointer ${
                          selectedTimeSlot === slot
                            ? "bg-on-background text-white border-on-background shadow-xs"
                            : "bg-background border-line text-on-background hover:bg-surface-container"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 5: Contact Details */}
                <div className="border-t border-line pt-6 space-y-4">
                  <h3 className="font-['Archivo_Black'] text-base text-on-background">
                    4. Contact Details (Lead Capture)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-on-surface-variant mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Ahmad"
                        value={formData.parentName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            parentName: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-white border-2 border-line rounded-xl text-sm font-['Work_Sans'] focus:border-on-background focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-on-surface-variant mb-1">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Ahmad"
                        value={formData.studentName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            studentName: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-white border-2 border-line rounded-xl text-sm font-['Work_Sans'] focus:border-on-background focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-on-surface-variant mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full p-3 bg-white border-2 border-line rounded-xl text-sm font-['Work_Sans'] focus:border-on-background focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-on-surface-variant mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full p-3 bg-white border-2 border-line rounded-xl text-sm font-['Work_Sans'] focus:border-on-background focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-base py-4 rounded-full border-2 border-on-background neo-brutalist-shadow hover:-translate-y-0.5 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Saving Request...</span>
                    </>
                  ) : selectedTeacher ? (
                    `Request Consultation with ${selectedTeacher.name}`
                  ) : (
                    `Request ${selectedSubject.title} Consultation`
                  )}
                </button>
                <p className="text-center font-['Work_Sans'] text-xs text-muted">
                  🔒 Saved in real time to Firestore. An Alinea academic coordinator
                  will manually follow up to confirm your trial session.
                </p>
              </form>
            </div>

            {/* Dynamic Live Summary Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
              <div className="bg-on-background text-white p-6 md:p-7 rounded-3xl border-2 border-on-background shadow-lg">
                <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  CONSULTATION SUMMARY
                </span>

                <div className="my-6 border-b border-white/15 pb-5 space-y-4">
                  {selectedTeacher && (
                    <div className="flex items-center gap-3.5 bg-white/10 p-3 rounded-2xl border border-white/10">
                      <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-primary-container">
                        <Image
                          src={selectedTeacher.image}
                          alt={selectedTeacher.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-['IBM_Plex_Mono'] text-[10px] text-primary-container uppercase font-bold">
                          Lead Examiner
                        </p>
                        <p className="font-['Archivo_Black'] text-white text-sm truncate">
                          {selectedTeacher.name}
                        </p>
                        <p className="font-['Work_Sans'] text-[11px] text-surface-variant truncate">
                          {selectedTeacher.qualification}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-muted uppercase">
                      Target Subject
                    </p>
                    <p className="font-['Archivo_Black'] text-primary-container text-lg leading-snug">
                      {selectedSubject.title}
                    </p>
                    <p className="font-['Work_Sans'] text-xs text-white/80">
                      Level: {selectedLevelLabel}
                    </p>
                  </div>

                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-muted uppercase">
                      Exam Board Alignment
                    </p>
                    <p className="font-['Work_Sans'] font-bold text-white text-sm">
                      {selectedBoardLabel}
                    </p>
                    {activeBoardObj?.syllabus && (
                      <p className="font-['IBM_Plex_Mono'] text-[11px] text-primary-container">
                        Syllabus Code: {activeBoardObj.syllabus}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-muted uppercase">
                      Selected Slot
                    </p>
                    <p className="font-['IBM_Plex_Mono'] text-xs text-primary-container font-bold">
                      {selectedTimeSlot}
                    </p>
                  </div>

                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-muted uppercase">
                      Format
                    </p>
                    <p className="font-['Work_Sans'] text-xs text-surface-variant font-bold">
                      {selectedFormat}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2.5 mb-5">
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-primary-container font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Mark-scheme first diagnostic audit</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-surface-variant">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Initial session: 45 Minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-surface-variant">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Confirmation within 2 hours</span>
                  </div>
                </div>

                <p className="text-[11px] text-muted text-center font-['IBM_Plex_Mono'] leading-relaxed">
                  Confirmation and schedule matching is handled directly by an
                  Alinea academic representative.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-background flex items-center justify-center p-12">
          <div className="font-['Work_Sans'] text-sm text-on-surface-variant animate-pulse">
            Loading consultation form...
          </div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
