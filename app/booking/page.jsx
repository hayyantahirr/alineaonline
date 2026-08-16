"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, User, Sparkles, Clock, Calendar, ShieldCheck } from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const teacherParam = searchParams.get("teacher");
  const subjectParam = searchParams.get("subject");
  const levelParam = searchParams.get("level");

  const [preferredTeacher, setPreferredTeacher] = useState(teacherParam || "");
  const [selectedSubject, setSelectedSubject] = useState(subjectParam || "Economics");
  const [selectedLevel, setSelectedLevel] = useState(levelParam || "A-Level");
  const [selectedFormat, setSelectedFormat] = useState("1:1 Intensive");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    "4:00 PM - 5:30 PM GST (Dubai)",
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    examBoard: "Edexcel International",
    targetGrade: "A*",
    additionalNotes: "",
  });

  useEffect(() => {
    if (teacherParam) setPreferredTeacher(teacherParam);
    if (subjectParam) setSelectedSubject(subjectParam);
    if (levelParam) setSelectedLevel(levelParam);
  }, [teacherParam, subjectParam, levelParam]);

  const availableSubjects = [
    "Economics",
    "Mathematics",
    "Physics",
    "Biology",
    "English",
    "Business",
    "Accounting",
    "Chemistry",
    "Computer Science",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-background text-on-background">
      {/* Header */}
      <section className="bg-on-background text-white py-14 px-6 border-b-4 border-primary-container">
        <div className="max-w-container-max mx-auto text-center">
          <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            RESERVE YOUR ACADEMIC CONSULTATION
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl md:text-5xl text-primary-container mt-3 mb-3">
            {preferredTeacher
              ? `Book a Session with ${preferredTeacher}`
              : "Book a Session with Alinea Online"}
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-surface-variant max-w-xl mx-auto">
            {preferredTeacher
              ? `Submit your details below to arrange a 1:1 diagnostic consultation or trial with ${preferredTeacher}. Our academic team will contact you to confirm timing.`
              : "Select your target subject, current level, and preferred consultation time slot below."}
          </p>
        </div>
      </section>

      {/* Main Booking Container */}
      <section className="py-14 md:py-20 px-6 max-w-container-max mx-auto">
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
                {selectedSubject} ({selectedLevel})
              </strong>{" "}
              session slot
              {preferredTeacher ? (
                <>
                  {" "}
                  with <strong>{preferredTeacher}</strong>
                </>
              ) : (
                ""
              )}
              .
            </p>
            <div className="bg-white/70 rounded-2xl p-4 border border-on-background mb-6 text-left font-['Work_Sans'] text-xs text-on-surface-variant space-y-1.5">
              <p>
                <strong>Next Steps:</strong> An Alinea rep will manually verify teacher
                availability and match your preferred time slot ({selectedTimeSlot}).
              </p>
              <p>
                No payment is required today — consultation terms are confirmed
                prior to the session.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  parentName: "",
                  studentName: "",
                  email: "",
                  phone: "",
                  examBoard: "Edexcel International",
                  targetGrade: "A*",
                  additionalNotes: "",
                });
              }}
              className="bg-on-background text-white font-['Work_Sans'] font-bold text-sm px-8 py-3.5 rounded-full border border-white hover:bg-black transition-colors"
            >
              Book Another Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border-2 border-on-background bento-shadow">
              {/* Teacher Pre-fill Notice Banner */}
              {preferredTeacher && (
                <div className="bg-primary-container/20 border-2 border-on-background rounded-2xl p-4 md:p-5 flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-primary-container border border-on-background flex items-center justify-center font-bold text-on-background shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-['IBM_Plex_Mono'] text-[11px] font-bold uppercase text-[#c0392b] tracking-wider block">
                        Requested Faculty Specialist
                      </span>
                      <h4 className="font-['Archivo_Black'] text-base md:text-lg text-on-background">
                        {preferredTeacher}
                      </h4>
                      <p className="font-['Work_Sans'] text-xs text-on-surface-variant">
                        Assigned for {selectedSubject} consultation
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreferredTeacher("")}
                    className="text-xs font-['Work_Sans'] font-bold text-on-surface-variant hover:text-on-background underline underline-offset-2 shrink-0 cursor-pointer"
                  >
                    Change / Clear
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Subject Selection */}
                <div>
                  <label className="block font-['Archivo_Black'] text-lg text-on-background mb-3">
                    1. Select Target Subject
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {availableSubjects.map((sub) => {
                      const isSelected =
                        selectedSubject.toLowerCase().includes(sub.toLowerCase()) ||
                        sub.toLowerCase().includes(selectedSubject.toLowerCase());

                      return (
                        <button
                          type="button"
                          key={sub}
                          onClick={() => setSelectedSubject(sub)}
                          className={`p-3 rounded-xl border-2 font-['Work_Sans'] font-bold text-xs md:text-sm text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-primary-container border-on-background text-on-background neo-brutalist-shadow"
                              : "bg-background border-line text-on-surface-variant hover:bg-surface-container hover:border-on-background/40"
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Level & Exam Board */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant mb-2">
                      Academic Level *
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="IGCSE / O-Level">IGCSE / O-Level</option>
                      <option value="AS-Level">AS-Level</option>
                      <option value="A-Level">A2 / Full A-Level</option>
                      <option value="IB Diploma (SL/HL)">IB Diploma (SL/HL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant mb-2">
                      Exam Board *
                    </label>
                    <select
                      value={formData.examBoard}
                      onChange={(e) =>
                        setFormData({ ...formData, examBoard: e.target.value })
                      }
                      className="w-full p-3.5 bg-background border-2 border-line focus:border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Edexcel International">Edexcel International (IAL)</option>
                      <option value="CAIE Cambridge">CAIE Cambridge (CAIE)</option>
                      <option value="AQA UK">AQA Specification</option>
                      <option value="OCR">OCR</option>
                      <option value="IB Diploma">IB International Baccalaureate</option>
                      <option value="Other / Multiple">Other / Multiple Boards</option>
                    </select>
                  </div>
                </div>

                {/* Step 3: Session Format */}
                <div>
                  <label className="block font-['Archivo_Black'] text-base text-on-background mb-3">
                    2. Preferred Session Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "1:1 Intensive Mentorship",
                        desc: "Personalized focus with your chosen subject specialist",
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
                          setFormData({ ...formData, parentName: e.target.value })
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
                          setFormData({ ...formData, studentName: e.target.value })
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
                  className="w-full bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-base py-4 rounded-full border-2 border-on-background neo-brutalist-shadow hover:-translate-y-0.5 transition-transform cursor-pointer"
                >
                  {preferredTeacher
                    ? `Request Consultation with ${preferredTeacher}`
                    : "Confirm Consultation Request"}
                </button>
                <p className="text-center font-['Work_Sans'] text-xs text-muted">
                  🔒 No payment required today. An Alinea academic coordinator will
                  manually follow up to arrange your trial/demo session.
                </p>
              </form>
            </div>

            {/* Live Summary Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
              <div className="bg-on-background text-white p-6 md:p-7 rounded-3xl border-2 border-on-background shadow-lg">
                <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  CONSULTATION SUMMARY
                </span>

                <div className="my-6 border-b border-white/15 pb-5 space-y-3.5">
                  {preferredTeacher && (
                    <div>
                      <p className="font-['IBM_Plex_Mono'] text-[11px] text-primary-container uppercase font-bold">
                        Requested Teacher
                      </p>
                      <p className="font-['Archivo_Black'] text-white text-base">
                        {preferredTeacher}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-muted uppercase">
                      Target Subject
                    </p>
                    <p className="font-['Archivo_Black'] text-primary-container text-lg">
                      {selectedSubject} ({selectedLevel})
                    </p>
                  </div>

                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-muted uppercase">
                      Format
                    </p>
                    <p className="font-['Work_Sans'] font-bold text-white text-sm">
                      {selectedFormat}
                    </p>
                  </div>

                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-muted uppercase">
                      Selected Slot
                    </p>
                    <p className="font-['IBM_Plex_Mono'] text-xs text-primary-container">
                      {selectedTimeSlot}
                    </p>
                  </div>

                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-muted uppercase">
                      Exam Board
                    </p>
                    <p className="font-['Work_Sans'] text-xs text-surface-variant">
                      {formData.examBoard}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2.5 mb-5">
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-primary-container font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Examiner-led feedback guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-surface-variant">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Initial diagnostic session: 45 Mins</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-surface-variant">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Manual scheduling confirmation within 2h</span>
                  </div>
                </div>

                <p className="text-[11px] text-muted text-center font-['IBM_Plex_Mono'] leading-relaxed">
                  Confirmation and schedule matching is handled directly by an Alinea academic representative.
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
