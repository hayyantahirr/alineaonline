"use client";

import { useState, useMemo, useEffect } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  Calendar,
  Globe2,
  BookOpen,
} from "lucide-react";
import { packages, countries } from "@/data/pricingData";
import Link from "next/link";

export default function PricingPage() {
  const [subjects, setSubjects] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("AE");
  const [selectedPackageId, setSelectedPackageId] = useState("diagnostic");

  // Fetch subjects from server-side API route
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await fetch("/api/subjects");
        const data = await res.json();
        if (data.success && Array.isArray(data.subjects)) {
          setSubjects(data.subjects);
        }
      } catch (err) {
        console.error("Error fetching subjects in pricing:", err);
      }
    }
    fetchSubjects();
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    subjectId: "",
    levelId: "",
    boardId: "",
    preferredDays: "",
    preferredTime: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState("");

  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === selectedCountryCode) || countries[0],
    [selectedCountryCode],
  );

  const formatPrice = (basePrice) => {
    const converted = basePrice * selectedCountry.rate;
    // Format to 0 decimal places for cleaner look, or 2 if needed
    return `${selectedCountry.symbol} ${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const handleCountryChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  const handlePackageSelect = (pkgId) => {
    setSelectedPackageId(pkgId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset level/board if subject changes
      ...(name === "subjectId" && { levelId: "", boardId: "" }),
      // Reset board if level changes
      ...(name === "levelId" && { boardId: "" }),
    }));
  };

  // Derived options for dropdowns based on subject selection
  const selectedSubjectData = subjects.find(
    (s) => s.id === formData.subjectId,
  );
  const availableLevels = selectedSubjectData?.levels || [];

  const selectedLevelData = availableLevels.find(
    (l) => l.id === formData.levelId,
  );
  const availableBoards = selectedLevelData?.boards || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const pkg = packages.find((p) => p.id === selectedPackageId) || packages[0];
    const formattedPriceStr = formatPrice(pkg.basePrice);

    const subjectTitle = selectedSubjectData?.title || formData.subjectId || "Not specified";
    const levelTitle = selectedLevelData?.label || formData.levelId || "Not specified";
    const selectedBoardData = availableBoards.find((b) => b.id === formData.boardId);
    const boardTitle = selectedBoardData?.label
      ? `${selectedBoardData.label}${selectedBoardData.syllabus ? ` (${selectedBoardData.syllabus})` : ""}`
      : formData.boardId || "Not specified";

    // Construct WhatsApp message with all details and selected options
    const whatsappMessage = `*New Booking Request - Alinea Online*

*Student Details:*
• *Student Name:* ${formData.studentName}
• *Parent Name:* ${formData.parentName}
• *Email:* ${formData.email}
• *Phone:* ${formData.phone}

*Package & Pricing:*
• *Package:* ${pkg.title} (${pkg.sessions} Session${pkg.sessions > 1 ? "s" : ""})
• *Estimated Fee:* ${formattedPriceStr}
• *Region:* ${selectedCountry.name} (${selectedCountry.timezone})

*Academic Focus:*
• *Subject:* ${subjectTitle}
• *Level:* ${levelTitle}
• *Exam Board:* ${boardTitle}

*Scheduling Preferences:*
• *Preferred Days:* ${formData.preferredDays}
• *Preferred Time:* ${formData.preferredTime} (${selectedCountry.timezone})`;

    const waUrl = `https://wa.me/923322348565?text=${encodeURIComponent(whatsappMessage)}`;
    setWhatsappRedirectUrl(waUrl);

    // Open WhatsApp directly
    window.open(waUrl, "_blank");
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-[#faf8f2] text-on-background min-h-screen grain-bg pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-xl mx-auto text-center bg-white p-10 rounded-3xl border-2 border-line neo-brutalist-shadow">
          <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-on-background shadow-[4px_4px_0_0_var(--color-on-background)]">
            <CheckCircle2 className="w-10 h-10 text-on-background" />
          </div>
          <h1 className="font-['Archivo_Black'] text-3xl md:text-4xl text-on-background mb-4">
            Booking Request Received!
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant leading-relaxed mb-6">
            Thank you for choosing Alinea Online. We are redirecting you to our
            academic team on WhatsApp to confirm your schedule and finalize your
            booking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {whatsappRedirectUrl && (
              <a
                href={whatsappRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-['Work_Sans'] font-extrabold text-sm px-8 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span>Continue to WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-on-background font-['Work_Sans'] font-extrabold text-sm px-8 py-4 rounded-full border-2 border-on-background hover:bg-[#faf8f2] transition-colors"
            >
              Return to Home
            </Link>
          </div>

          <p className="font-['IBM_Plex_Mono'] text-xs text-muted">
            Direct WhatsApp: +92 332 2348565
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#faf8f2] text-on-background min-h-screen grain-bg">
      {/* Header */}
      <section className="pt-24 pb-12 px-6 border-b-2 border-line bg-[#f5f2e9]/60">
        <div className="max-w-container-max mx-auto text-center">
          <h1 className="font-['Archivo_Black'] text-4xl sm:text-5xl md:text-6xl text-on-background mb-6 leading-tight">
            Book Your Sessions
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Select a package, tell us what you need help with, and pick a time
            that works for you. All pricing is localized for your region.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: Pricing & Packages */}
          <div className="w-full lg:w-5/12 flex flex-col gap-8">
            {/* Country Selector */}
            <div className="bg-white rounded-2xl p-6 border-2 border-line">
              <label className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
                <Globe2 className="w-4 h-4 text-[#c0392b]" />
                Select Your Region
              </label>
              <select
                value={selectedCountryCode}
                onChange={handleCountryChange}
                className="w-full font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} ({country.currency})
                  </option>
                ))}
              </select>
            </div>

            {/* Package List */}
            <div className="flex flex-col gap-5">
              {packages.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-on-background text-white border-on-background shadow-[6px_6px_0_0_var(--color-primary-container)]"
                        : "bg-white border-line hover:border-on-background/40 hover:bg-[#f5f2e9]"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 right-6 bg-[#c0392b] text-white font-['IBM_Plex_Mono'] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3
                          className={`font-['Archivo_Black'] text-xl mb-1 ${isSelected ? "text-white" : "text-on-background"}`}
                        >
                          {pkg.title}
                        </h3>
                        <p
                          className={`font-['Work_Sans'] text-sm ${isSelected ? "text-surface-variant" : "text-on-surface-variant"}`}
                        >
                          {pkg.sessions} Session{pkg.sessions > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-['Archivo_Black'] text-2xl ${isSelected ? "text-primary-container" : "text-[#c0392b]"}`}
                        >
                          {formatPrice(pkg.basePrice)}
                        </span>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span
                            className={`font-bold text-sm ${isSelected ? "text-primary-container" : "text-[#c0392b]"}`}
                          >
                            ✓
                          </span>
                          <span
                            className={`font-['Work_Sans'] text-sm ${isSelected ? "text-white" : "text-on-background"}`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Booking Form */}
          <div className="w-full lg:w-7/12">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-12 border-2 border-line neo-brutalist-shadow flex flex-col gap-8"
            >
              {/* Personal Details */}
              <div>
                <h3 className="font-['Archivo_Black'] text-xl text-on-background mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Parent Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Subject Selection */}
              <div>
                <h3 className="font-['Archivo_Black'] text-xl text-on-background mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  Academic Focus
                </h3>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5" /> Subject *
                    </label>
                    <select
                      name="subjectId"
                      value={formData.subjectId}
                      onChange={handleChange}
                      required
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Select a Subject...</option>
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {availableLevels.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                        Level *
                      </label>
                      <select
                        name="levelId"
                        value={formData.levelId}
                        onChange={handleChange}
                        required
                        className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Select Level...</option>
                        {availableLevels.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {availableBoards.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                        Exam Board *
                      </label>
                      <select
                        name="boardId"
                        value={formData.boardId}
                        onChange={handleChange}
                        required
                        className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Select Board...</option>
                        {availableBoards.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.label} {b.syllabus ? `(${b.syllabus})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Scheduling */}
              <div>
                <h3 className="font-['Archivo_Black'] text-xl text-on-background mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  Scheduling
                </h3>
                <div className="bg-[#f5f2e9] border border-line rounded-xl p-4 mb-5 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#c0392b] shrink-0" />
                  <p className="font-['Work_Sans'] text-xs text-on-surface-variant">
                    Please provide your preferred days and timings. We will try
                    to match you with a slot in your local timezone (
                    <strong>{selectedCountry.timezone}</strong>).
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Preferred Day(s) *
                    </label>
                    <input
                      type="text"
                      name="preferredDays"
                      value={formData.preferredDays}
                      onChange={handleChange}
                      placeholder="e.g. Weekends, Monday/Wednesday"
                      required
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Preferred Time ({selectedCountry.timezone}) *
                    </label>
                    <input
                      type="text"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      placeholder="e.g. After 4 PM, Evening"
                      required
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Area */}
              <div className="pt-6 mt-2 border-t-2 border-line">
                {submitError && (
                  <p className="font-['Work_Sans'] text-sm text-[#c0392b] font-bold bg-[#c0392b]/10 p-4 rounded-xl border border-[#c0392b]/30 mb-5">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-on-background text-white font-['Work_Sans'] font-extrabold text-sm md:text-base px-8 py-5 rounded-full border-2 border-on-background shadow-[6px_6px_0_0_var(--color-primary-container)] transition-transform duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Request...
                    </>
                  ) : (
                    <>
                      Request Booking —{" "}
                      {formatPrice(
                        packages.find((p) => p.id === selectedPackageId)
                          ?.basePrice,
                      )}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="font-['Work_Sans'] text-xs text-center text-muted mt-4">
                  No payment required right now. We will contact you to confirm
                  the schedule before sending a payment link.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
