"use client";

import { useState } from "react";

export default function BookingPage() {
  const [selectedSubject, setSelectedSubject] = useState("Economics");
  const [selectedLevel, setSelectedLevel] = useState("A-Level");
  const [selectedFormat, setSelectedFormat] = useState("1:1 Intensive");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("4:00 PM - 5:30 PM GST (Dubai)");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    examBoard: "Edexcel International",
    targetGrade: "A*",
  });

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
            Book a Session with Alinea Online
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-surface-variant max-w-xl mx-auto">
            Select your target subject, current level, and preferred consultation time slot below.
          </p>
        </div>
      </section>

      {/* Main Booking Container */}
      <section className="py-16 px-6 max-w-container-max mx-auto">
        {isSubmitted ? (
          <div className="bg-primary-container text-on-background p-10 md:p-16 rounded-6 border-2 border-on-background neo-brutalist-shadow text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-on-background text-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="font-['Archivo_Black'] text-3xl mb-4">
              Consultation Request Received!
            </h2>
            <p className="font-['Work_Sans'] text-base text-on-primary-container leading-relaxed mb-6">
              Thank you <strong>{formData.parentName || "Parent"}</strong>. Our senior academic coordinator will reach out to you via WhatsApp / email within 2 hours to confirm your <strong>{selectedSubject} ({selectedLevel})</strong> session slot.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-on-background text-white font-['Work_Sans'] font-bold text-sm px-6 py-3 rounded-full border border-white"
            >
              Book Another Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="md:col-span-8 bg-white rounded-6 p-8 md:p-10 border-2 border-on-background bento-shadow">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Subject Selection */}
                <div>
                  <label className="block font-['Archivo_Black'] text-lg text-on-background mb-3">
                    1. Select Target Subject
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Economics", "Mathematics", "Physics", "Business"].map((sub) => (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => setSelectedSubject(sub)}
                        className={`p-3 rounded-xl border-1.5 font-['Work_Sans'] font-bold text-sm text-center transition-all ${
                          selectedSubject === sub
                            ? "bg-primary-container border-on-background text-on-background neo-brutalist-shadow"
                            : "bg-background border-line text-on-surface-variant hover:bg-surface-container"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Level & Exam Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-['Archivo_Black'] text-sm text-on-background mb-2">
                      Academic Level
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full p-3.5 bg-background border border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                    >
                      <option value="IGCSE / O-Level">IGCSE / O-Level</option>
                      <option value="AS-Level">AS-Level</option>
                      <option value="A-Level">A2 / Full A-Level</option>
                      <option value="IB Diploma HL">IB Diploma HL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-['Archivo_Black'] text-sm text-on-background mb-2">
                      Exam Board
                    </label>
                    <select
                      value={formData.examBoard}
                      onChange={(e) => setFormData({ ...formData, examBoard: e.target.value })}
                      className="w-full p-3.5 bg-background border border-on-background rounded-xl font-['Work_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                    >
                      <option value="Edexcel International">Edexcel International (IAL)</option>
                      <option value="CAIE Cambridge">CAIE Cambridge (9708/0455)</option>
                      <option value="AQA UK">AQA UK Specification</option>
                      <option value="IB Diploma">IB International Baccalaureate</option>
                    </select>
                  </div>
                </div>

                {/* Step 3: Session Format */}
                <div>
                  <label className="block font-['Archivo_Black'] text-sm text-on-background mb-3">
                    2. Preferred Session Format
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "1:1 Intensive Mentorship",
                        desc: "Personalized focus with senior examiner lead",
                      },
                      {
                        title: "Small Group Masterclass (Max 4)",
                        desc: "Peer discussion & collaborative past paper drills",
                      },
                    ].map((fmt) => (
                      <div
                        key={fmt.title}
                        onClick={() => setSelectedFormat(fmt.title)}
                        className={`p-4 rounded-xl border-1.5 cursor-pointer transition-all ${
                          selectedFormat === fmt.title
                            ? "bg-primary-container/20 border-on-background shadow-sm"
                            : "bg-background border-line hover:bg-surface-container"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-['Archivo_Black'] text-sm text-on-background">
                            {fmt.title}
                          </span>
                          <input
                            type="radio"
                            name="format"
                            checked={selectedFormat === fmt.title}
                            onChange={() => setSelectedFormat(fmt.title)}
                            className="accent-on-background"
                          />
                        </div>
                        <p className="font-['Work_Sans'] text-xs text-secondary">{fmt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 4: Time Slot */}
                <div>
                  <label className="block font-['Archivo_Black'] text-sm text-on-background mb-2">
                    3. Select Preferred Time Slot (GCC & Asia Friendly)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        className={`p-3 rounded-xl border font-['IBM_Plex_Mono'] text-xs text-left transition-all ${
                          selectedTimeSlot === slot
                            ? "bg-on-background text-primary-container border-on-background"
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
                    4. Contact Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-on-background mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Ahmad"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full p-3 bg-background border border-on-background rounded-xl text-sm font-['Work_Sans']"
                      />
                    </div>
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-on-background mb-1">
                        Student Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tariq Ahmad"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full p-3 bg-background border border-on-background rounded-xl text-sm font-['Work_Sans']"
                      />
                    </div>
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-on-background mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 bg-background border border-on-background rounded-xl text-sm font-['Work_Sans']"
                      />
                    </div>
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-on-background mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 bg-background border border-on-background rounded-xl text-sm font-['Work_Sans']"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-container text-on-primary-container font-['Archivo_Black'] text-lg py-4 rounded-full border-2 border-on-background neo-brutalist-shadow hover:-translate-y-0.5 transition-transform"
                >
                  Confirm Consultation Slot
                </button>
              </form>
            </div>

            {/* Live Summary Sidebar */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="bg-on-background text-white p-6 rounded-6 border-2 border-on-background shadow-lg sticky top-28">
                <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-2.75 font-bold px-2.5 py-0.5 rounded-full uppercase">
                  BOOKING SUMMARY
                </span>

                <div className="my-6 border-b border-ink-soft pb-4 space-y-3">
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-2.75 text-muted">Subject</p>
                    <p className="font-['Archivo_Black'] text-primary-container text-lg">{selectedSubject} ({selectedLevel})</p>
                  </div>
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-2.75 text-muted">Format</p>
                    <p className="font-['Work_Sans'] font-bold text-white text-sm">{selectedFormat}</p>
                  </div>
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-2.75 text-muted">Selected Slot</p>
                    <p className="font-['IBM_Plex_Mono'] text-xs text-primary-fixed">{selectedTimeSlot}</p>
                  </div>
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-2.75 text-muted">Exam Board</p>
                    <p className="font-['Work_Sans'] text-xs text-surface-variant">{formData.examBoard}</p>
                  </div>
                </div>

                <div className="bg-inverse-surface p-4 rounded-xl border border-outline space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-primary-container">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Examiner-led feedback guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-surface-variant">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>Initial diagnostic session: 45 Mins</span>
                  </div>
                </div>

                <p className="text-2.75 text-muted text-center font-['IBM_Plex_Mono']">
                  🔒 No immediate payment required. Confirmation is handled via WhatsApp after slot reservation.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
