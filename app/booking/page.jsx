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

function BookingContent() {
  const searchParams = useSearchParams();
  const teacherParam = searchParams.get("teacher");
  const subjectParam = searchParams.get("subject");
  const levelParam = searchParams.get("level");

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedLevelLabel, setSelectedLevelLabel] = useState(
    levelParam || "A-Level",
  );
  const [selectedBoardLabel, setSelectedBoardLabel] =
    useState("Edexcel (Pearson)");

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

  // Fetch subjects and teachers from APIs
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const [teachersRes, subjectsRes] = await Promise.all([
          fetch("/api/teachers"),
          fetch("/api/subjects"),
        ]);

        const teachersData = await teachersRes.json();
        const subjectsData = await subjectsRes.json();

        if (isMounted) {
          const loadedTeachers =
            teachersData.success && Array.isArray(teachersData.teachers)
              ? teachersData.teachers
              : [];
          const loadedSubjects =
            subjectsData.success && Array.isArray(subjectsData.subjects)
              ? subjectsData.subjects
              : [];

          setTeachers(loadedTeachers);
          setSubjects(loadedSubjects);

          // Find teacher by param or default
          let resolvedTeacher = null;
          if (teacherParam) {
            const lower = teacherParam.toLowerCase();
            resolvedTeacher = loadedTeachers.find(
              (t) =>
                t.name?.toLowerCase().includes(lower) ||
                lower.includes(t.name?.toLowerCase() || "") ||
                t.id === lower,
            );
          }

          // Find subject by param, or by teacher, or default to first
          let resolvedSubject = null;
          if (subjectParam) {
            const lower = subjectParam.toLowerCase();
            resolvedSubject = loadedSubjects.find(
              (s) =>
                s.id?.toLowerCase() === lower ||
                s.title?.toLowerCase().includes(lower) ||
                lower.includes(s.title?.toLowerCase() || ""),
            );
          } else if (resolvedTeacher) {
            resolvedSubject = loadedSubjects.find(
              (s) =>
                s.title
                  ?.toLowerCase()
                  .includes(
                    resolvedTeacher.subjectBookingParam?.toLowerCase() || "",
                  ) ||
                resolvedTeacher.subject
                  ?.toLowerCase()
                  .includes(s.title?.toLowerCase().split(" ")[0] || ""),
            );
          }

          if (!resolvedSubject && loadedSubjects.length > 0) {
            resolvedSubject = loadedSubjects[0];
          }

          if (!resolvedTeacher && loadedTeachers.length > 0) {
            resolvedTeacher = loadedTeachers[0];
          }

          setSelectedSubject(resolvedSubject);
          setSelectedTeacher(resolvedTeacher);

          if (resolvedSubject?.levels?.length > 0) {
            const firstLevel = resolvedSubject.levels[0];
            setSelectedLevelLabel(levelParam || firstLevel.label);
            if (firstLevel.boards?.length > 0) {
              setSelectedBoardLabel(firstLevel.boards[0].label);
            }
          }
        }
      } catch (err) {
        console.error("Booking data fetch error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [teacherParam, subjectParam, levelParam]);

  // Current Level Object (derived from selectedSubject)
  const currentLevels = selectedSubject?.levels || [];
  const activeLevelObj = currentLevels.find(
    (l) => l.label === selectedLevelLabel,
  ) ||
    currentLevels[0] || { boards: [] };

  // Current Boards for active level
  const currentBoards = activeLevelObj.boards || [];

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
    const leadTeacher =
      teachers.find(
        (f) =>
          f.subject
            ?.toLowerCase()
            .includes(subject.title?.toLowerCase().split(" ")[0] || "") ||
          (f.subjectBookingParam &&
            subject.title
              ?.toLowerCase()
              .includes(f.subjectBookingParam.toLowerCase())),
      ) || teachers[0];
    if (leadTeacher) setSelectedTeacher(leadTeacher);
  };

  // Handler when user selects a Teacher dropdown
  const handleSelectTeacher = (teacherId) => {
    const t = teachers.find((f) => f.id === teacherId);
    if (!t) return;
    setSelectedTeacher(t);

    // Auto-select corresponding subject if available
    const matchingSub = subjects.find(
      (s) =>
        s.title
          ?.toLowerCase()
          .includes(t.subjectBookingParam?.toLowerCase() || "") ||
        t.subject
          ?.toLowerCase()
          .includes(s.title?.toLowerCase().split(" ")[0] || ""),
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
        subject: selectedSubject?.title || "Subject",
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
    <div className="w-full bg-[#faf8f2] text-on-background min-h-screen">
      {/* Header */}
      <section className="bg-on-background text-white py-14 px-6 border-b-4 border-primary-container">
        <div className="max-w-container-max mx-auto text-center">
          <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            RESERVE YOUR ACADEMIC CONSULTATION
          </span>
          <h1 className="font-['Archivo_Black'] text-3xl md:text-5xl text-primary-container mt-4 mb-3">
            {selectedTeacher
              ? `Book a Session with ${selectedTeacher.name}`
              : selectedSubject
                ? `Book Your ${selectedSubject.title} Consultation`
                : "Book Your Academic Consultation"}
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#c0392b]" />
          </div>
        ) : isSubmitted ? (
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
                {selectedSubject?.title} ({selectedLevelLabel})
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
              <p className="text-muted pt-1">No payment is required today.</p>
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
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-on-background shrink-0 relative bg-surface-container-low">
                      {selectedTeacher.image ? (
                        <Image
                          src={selectedTeacher.image}
                          alt={selectedTeacher.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary-container font-['Archivo_Black'] bg-[#191c1d]">
                          {selectedTeacher.name?.slice(0, 2).toUpperCase()}
                        </div>
                      )}
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
                          ●{" "}
                          {selectedTeacher.availability || "Accepting Students"}
                        </span>
                      </div>
                      <h4 className="font-['Archivo_Black'] text-lg text-on-background flex items-center gap-2">
                        {selectedTeacher.name}
                        {selectedTeacher.qualification && (
                          <span className="font-['Work_Sans'] text-xs font-normal text-on-surface-variant">
                            ({selectedTeacher.qualification})
                          </span>
                        )}
                      </h4>
                      <p className="font-['Work_Sans'] text-xs text-on-surface-variant">
                        {selectedTeacher.role}{" "}
                        {selectedTeacher.experience
                          ? `· ${selectedTeacher.experience} Exp.`
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* Change Teacher Dropdown */}
                  {teachers.length > 0 && (
                    <div className="w-full sm:w-auto">
                      <label className="block font-['IBM_Plex_Mono'] text-[10px] uppercase font-bold text-on-surface-variant mb-1">
                        Switch Specialist:
                      </label>
                      <select
                        value={selectedTeacher.id}
                        onChange={(e) => handleSelectTeacher(e.target.value)}
                        className="w-full sm:w-auto p-2 bg-white border border-on-background rounded-xl font-['Work_Sans'] text-xs font-bold focus:outline-none cursor-pointer"
                      >
                        {teachers.map((fac) => (
                          <option key={fac.id} value={fac.id}>
                            {fac.name} (
                            {fac.subject?.split(" ")[0] || "Specialist"})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Target Subject Selection */}
                {subjects.length > 0 && selectedSubject && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-['Archivo_Black'] text-lg text-on-background">
                        1. Select Target Subject
                      </label>
                      <span className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant">
                        {subjects.length} Subjects Available
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {subjects.map((sub) => {
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
                )}

                {/* Step 2: Dynamic Levels & Exam Boards */}
                {selectedSubject && (
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
                        Exam Board Specification *
                      </label>
                      <select
                        value={selectedBoardLabel}
                        onChange={(e) => setSelectedBoardLabel(e.target.value)}
                        className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        {currentBoards.map((b) => (
                          <option key={b.id} value={b.label}>
                            {b.label} {b.syllabus ? `(${b.syllabus})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Session Format */}
                <div>
                  <label className="block font-['Archivo_Black'] text-lg text-on-background mb-3">
                    2. Choose Mentorship Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        title: "1:1 Intensive Mentorship",
                        badge: "POPULAR",
                        desc: "Dedicated senior specialist tailored to student's exact syllabus.",
                      },
                      {
                        title: "Small Group Masterclass (Max 4)",
                        badge: "INTERACTIVE",
                        desc: "Collaborative problem-solving with peers at matching target grades.",
                      },
                      {
                        title: "Diagnostic Exam Assessment",
                        badge: "TRIAL",
                        desc: "Full syllabus gap-analysis and benchmark grade prediction.",
                      },
                    ].map((fmt) => {
                      const isSelected = selectedFormat === fmt.title;
                      return (
                        <div
                          key={fmt.title}
                          onClick={() => setSelectedFormat(fmt.title)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? "bg-on-background text-white border-on-background shadow-[4px_4px_0_0_var(--color-primary-container)]"
                              : "bg-[#faf8f2] border-line text-on-background hover:border-on-background/40"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={`font-['IBM_Plex_Mono'] text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                                  isSelected
                                    ? "bg-primary-container text-on-background border-primary-container"
                                    : "bg-surface-container border-line text-on-surface-variant"
                                }`}
                              >
                                {fmt.badge}
                              </span>
                            </div>
                            <h5 className="font-['Archivo_Black'] text-sm mb-1.5 leading-snug">
                              {fmt.title}
                            </h5>
                            <p
                              className={`font-['Work_Sans'] text-xs leading-relaxed ${
                                isSelected
                                  ? "text-surface-variant"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              {fmt.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Time Slot Selection */}
                <div>
                  <label className="block font-['Archivo_Black'] text-lg text-on-background mb-3">
                    3. Preferred Weekly Time Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "4:00 PM - 5:30 PM GST (Dubai / GCC)",
                      "5:30 PM - 7:00 PM GST (Dubai / GCC)",
                      "7:00 PM - 8:30 PM GST (Dubai / GCC)",
                      "Weekend Morning (10:00 AM - 1:00 PM GST)",
                    ].map((slot) => (
                      <label
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedTimeSlot === slot
                            ? "bg-[#faf8f2] border-on-background font-bold text-on-background"
                            : "bg-white border-line text-on-surface-variant hover:border-on-background/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeSlot"
                          checked={selectedTimeSlot === slot}
                          onChange={() => setSelectedTimeSlot(slot)}
                          className="w-4 h-4 accent-primary-container"
                        />
                        <span className="font-['Work_Sans'] text-xs sm:text-sm">
                          {slot}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 5: Student & Contact Details */}
                <div className="border-t-2 border-line pt-6">
                  <label className="block font-['Archivo_Black'] text-lg text-on-background mb-4">
                    4. Student &amp; Contact Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-['Work_Sans'] font-bold text-xs uppercase text-on-surface-variant mb-1.5">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mrs. Sarah Al-Mansoor"
                        value={formData.parentName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            parentName: e.target.value,
                          })
                        }
                        className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-['Work_Sans'] font-bold text-xs uppercase text-on-surface-variant mb-1.5">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Al-Mansoor"
                        value={formData.studentName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            studentName: e.target.value,
                          })
                        }
                        className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-['Work_Sans'] font-bold text-xs uppercase text-on-surface-variant mb-1.5">
                        Parent Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-['Work_Sans'] font-bold text-xs uppercase text-on-surface-variant mb-1.5">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Work_Sans'] font-bold text-xs uppercase text-on-surface-variant mb-1.5">
                        Target Grade Goal
                      </label>
                      <select
                        value={formData.targetGrade}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            targetGrade: e.target.value,
                          })
                        }
                        className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="A* (90%+ Highest Distinction)">
                          A* (90%+ Highest Distinction)
                        </option>
                        <option value="A (80%-89% Grade A)">
                          A (80%-89% Grade A)
                        </option>
                        <option value="B to A Grade Jump">
                          B to A Grade Jump
                        </option>
                        <option value="C to A Turnaround Strategy">
                          C to A Turnaround Strategy
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-['Work_Sans'] font-bold text-xs uppercase text-on-surface-variant mb-1.5">
                        Additional Notes (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Current mock grades, weak topics..."
                        value={formData.additionalNotes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            additionalNotes: e.target.value,
                          })
                        }
                        className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-base py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Consultation Request...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Confirm &amp; Book Consultation with{" "}
                        {selectedTeacher?.name || "Specialist"}
                      </span>
                      <Calendar className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar Summary Card */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
              <div className="bg-[#f5f2e9] rounded-3xl p-6 md:p-8 border-2 border-on-background neo-brutalist-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#c0392b]" />
                  <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-on-background uppercase tracking-wider">
                    CONSULTATION SUMMARY
                  </span>
                </div>

                <div className="space-y-4 font-['Work_Sans'] text-sm border-b border-line pb-6 mb-6">
                  <div>
                    <span className="text-xs text-on-surface-variant block mb-0.5">
                      Subject
                    </span>
                    <strong className="text-on-background text-base">
                      {selectedSubject?.title || "Not selected"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block mb-0.5">
                      Level &amp; Board
                    </span>
                    <strong className="text-on-background">
                      {selectedLevelLabel} · {selectedBoardLabel}
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block mb-0.5">
                      Specialist Tutor
                    </span>
                    <strong className="text-on-background">
                      {selectedTeacher?.name || "Examiner Lead"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block mb-0.5">
                      Mentorship Format
                    </span>
                    <strong className="text-on-background text-xs">
                      {selectedFormat}
                    </strong>
                  </div>
                </div>

                <div className="space-y-3 font-['Work_Sans'] text-xs text-on-surface-variant">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Examiner-Report-Driven Mark-Scheme Teaching
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-on-background" />
                    Direct Academic Oversight by Founders
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-on-background" />
                    Diagnostic Syllabus Gap-Analysis Included
                  </div>
                </div>
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
        <div className="min-h-screen flex items-center justify-center bg-[#faf8f2]">
          <Loader2 className="w-8 h-8 animate-spin text-[#c0392b]" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
