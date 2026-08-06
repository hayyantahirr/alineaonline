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
    <div className="w-full bg-[#f8f9fa] text-[#191c1d]">
      {/* Header */}
      <section className="bg-[#191c1d] text-white py-14 px-6 border-b-4 border-[#ffd400]">
        <div className="max-w-[1180px] mx-auto text-center">
          <span className="bg-[#ffd400] text-[#191c1d] font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            RESERVE YOUR ACADEMIC CONSULTATION
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#ffd400] mt-3 mb-3">
            Book a Session with Alinea Online
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-[#e1e3e4] max-w-xl mx-auto">
            Select your target subject, current level, and preferred consultation time slot below.
          </p>
        </div>
      </section>

      {/* Main Booking Container */}
      <section className="py-16 px-6 max-w-[1180px] mx-auto">
        {isSubmitted ? (
          <div className="bg-[#ffd400] text-[#191c1d] p-10 md:p-16 rounded-[24px] border-2 border-[#191c1d] neo-brutalist-shadow text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#191c1d] text-[#ffd400] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="font-['Archivo_Black'] text-3xl mb-4">
              Consultation Request Received!
            </h2>
            <p className="font-['Work_Sans'] text-base text-[#705c00] leading-relaxed mb-6">
              Thank you <strong>{formData.parentName || "Parent"}</strong>. Our senior academic coordinator will reach out to you via WhatsApp / email within 2 hours to confirm your <strong>{selectedSubject} ({selectedLevel})</strong> session slot.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-[#191c1d] text-white font-['Work_Sans'] font-bold text-sm px-6 py-3 rounded-full border border-white"
            >
              Book Another Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="md:col-span-8 bg-[#ffffff] rounded-[24px] p-8 md:p-10 border-2 border-[#191c1d] bento-shadow">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Subject Selection */}
                <div>
                  <label className="block font-['Archivo_Black'] text-lg text-[#191c1d] mb-3">
                    1. Select Target Subject
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Economics", "Mathematics", "Physics", "Business"].map((sub) => (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => setSelectedSubject(sub)}
                        className={`p-3 rounded-xl border-[1.5px] font-['Work_Sans'] font-bold text-sm text-center transition-all ${
                          selectedSubject === sub
                            ? "bg-[#ffd400] border-[#191c1d] text-[#191c1d] neo-brutalist-shadow"
                            : "bg-[#f8f9fa] border-[#e7e8ea] text-[#4d4632] hover:bg-[#edeeef]"
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
                    <label className="block font-['Archivo_Black'] text-sm text-[#191c1d] mb-2">
                      Academic Level
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full p-3.5 bg-[#f8f9fa] border border-[#191c1d] rounded-xl font-['Work_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd400]"
                    >
                      <option value="IGCSE / O-Level">IGCSE / O-Level</option>
                      <option value="AS-Level">AS-Level</option>
                      <option value="A-Level">A2 / Full A-Level</option>
                      <option value="IB Diploma HL">IB Diploma HL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-['Archivo_Black'] text-sm text-[#191c1d] mb-2">
                      Exam Board
                    </label>
                    <select
                      value={formData.examBoard}
                      onChange={(e) => setFormData({ ...formData, examBoard: e.target.value })}
                      className="w-full p-3.5 bg-[#f8f9fa] border border-[#191c1d] rounded-xl font-['Work_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd400]"
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
                  <label className="block font-['Archivo_Black'] text-sm text-[#191c1d] mb-3">
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
                        className={`p-4 rounded-xl border-[1.5px] cursor-pointer transition-all ${
                          selectedFormat === fmt.title
                            ? "bg-[#ffd400]/20 border-[#191c1d] shadow-sm"
                            : "bg-[#f8f9fa] border-[#e7e8ea] hover:bg-[#edeeef]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-['Archivo_Black'] text-sm text-[#191c1d]">
                            {fmt.title}
                          </span>
                          <input
                            type="radio"
                            name="format"
                            checked={selectedFormat === fmt.title}
                            onChange={() => setSelectedFormat(fmt.title)}
                            className="accent-[#191c1d]"
                          />
                        </div>
                        <p className="font-['Work_Sans'] text-xs text-[#5c5f62]">{fmt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 4: Time Slot */}
                <div>
                  <label className="block font-['Archivo_Black'] text-sm text-[#191c1d] mb-2">
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
                            ? "bg-[#191c1d] text-[#ffd400] border-[#191c1d]"
                            : "bg-[#f8f9fa] border-[#e7e8ea] text-[#191c1d] hover:bg-[#edeeef]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 5: Contact Details */}
                <div className="border-t border-[#e7e8ea] pt-6 space-y-4">
                  <h3 className="font-['Archivo_Black'] text-base text-[#191c1d]">
                    4. Contact Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-[#191c1d] mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Ahmad"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full p-3 bg-[#f8f9fa] border border-[#191c1d] rounded-xl text-sm font-['Work_Sans']"
                      />
                    </div>
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-[#191c1d] mb-1">
                        Student Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tariq Ahmad"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full p-3 bg-[#f8f9fa] border border-[#191c1d] rounded-xl text-sm font-['Work_Sans']"
                      />
                    </div>
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-[#191c1d] mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 bg-[#f8f9fa] border border-[#191c1d] rounded-xl text-sm font-['Work_Sans']"
                      />
                    </div>
                    <div>
                      <label className="block font-['Work_Sans'] text-xs font-bold text-[#191c1d] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 bg-[#f8f9fa] border border-[#191c1d] rounded-xl text-sm font-['Work_Sans']"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ffd400] text-[#705c00] font-['Archivo_Black'] text-lg py-4 rounded-full border-2 border-[#191c1d] neo-brutalist-shadow hover:-translate-y-0.5 transition-transform"
                >
                  Confirm Consultation Slot
                </button>
              </form>
            </div>

            {/* Live Summary Sidebar */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="bg-[#191c1d] text-white p-6 rounded-[24px] border-2 border-[#191c1d] shadow-lg sticky top-28">
                <span className="bg-[#ffd400] text-[#191c1d] font-['IBM_Plex_Mono'] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  BOOKING SUMMARY
                </span>

                <div className="my-6 border-b border-[#3a3f45] pb-4 space-y-3">
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#a4a7ab]">Subject</p>
                    <p className="font-['Archivo_Black'] text-[#ffd400] text-lg">{selectedSubject} ({selectedLevel})</p>
                  </div>
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#a4a7ab]">Format</p>
                    <p className="font-['Work_Sans'] font-bold text-white text-sm">{selectedFormat}</p>
                  </div>
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#a4a7ab]">Selected Slot</p>
                    <p className="font-['IBM_Plex_Mono'] text-xs text-[#ffe177]">{selectedTimeSlot}</p>
                  </div>
                  <div>
                    <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#a4a7ab]">Exam Board</p>
                    <p className="font-['Work_Sans'] text-xs text-[#e1e3e4]">{formData.examBoard}</p>
                  </div>
                </div>

                <div className="bg-[#2e3132] p-4 rounded-xl border border-[#7f775f] space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-[#ffd400]">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Examiner-led feedback guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-['Work_Sans'] text-[#e1e3e4]">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>Initial diagnostic session: 45 Mins</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#a4a7ab] text-center font-['IBM_Plex_Mono']">
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
