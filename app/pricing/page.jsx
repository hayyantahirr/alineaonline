"use client";

import { useState, useMemo, useEffect } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  Globe2,
  CreditCard,
  Clock,
  ShieldCheck,
  Calculator,
  Sparkles,
  BookOpen,
} from "lucide-react";
import {
  COUNTRIES,
  HOURLY_RATES,
  BOOKING_STEPS_FLOW,
  formatPrice,
  convertPrice,
  getCountryByCode,
  detectCountryFromTimezone,
} from "@/constants/currencies";
import Link from "next/link";

export default function PricingPage() {
  const [subjects, setSubjects] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("AE");
  const [selectedLevelKey, setSelectedLevelKey] = useState("IGCSE"); // 'IGCSE' or 'A_LEVEL'
  const [hours, setHours] = useState(5);

  // Form State
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    subjectId: "",
    examBoard: "Edexcel (Pearson)",
    preferredTime: "4:00 PM - 5:30 PM GST",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState("");

  // Auto-detect country on mount
  useEffect(() => {
    let isMounted = true;

    async function detectCountry() {
      try {
        const res = await fetch("/api/geo");
        const data = await res.json();
        if (isMounted && data.success && data.country) {
          const matched = getCountryByCode(data.country);
          if (matched && matched.code !== "OTHER") {
            setSelectedCountryCode(matched.code);
            return;
          }
        }
      } catch (err) {
        // Fallback to timezone detection
      }

      if (isMounted) {
        const tzCountry = detectCountryFromTimezone();
        if (tzCountry && tzCountry !== "OTHER") {
          setSelectedCountryCode(tzCountry);
        }
      }
    }

    detectCountry();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch subjects from server-side API route
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await fetch("/api/subjects");
        const data = await res.json();
        if (data.success && Array.isArray(data.subjects)) {
          setSubjects(data.subjects);
          if (data.subjects.length > 0) {
            setFormData((prev) => ({
              ...prev,
              subjectId: prev.subjectId || data.subjects[0].title || data.subjects[0].id,
            }));
          }
        }
      } catch (err) {
        console.error("Error fetching subjects in pricing:", err);
      }
    }
    fetchSubjects();
  }, []);

  const selectedCountry = useMemo(
    () => getCountryByCode(selectedCountryCode),
    [selectedCountryCode]
  );

  const currentRateObj = HOURLY_RATES[selectedLevelKey] || HOURLY_RATES.IGCSE;
  const baseRateUSD = currentRateObj.rateUSD;
  const totalBasePriceUSD = baseRateUSD * hours;

  const formattedHourlyRate = formatPrice(baseRateUSD, selectedCountry);
  const formattedTotalPrice = formatPrice(totalBasePriceUSD, selectedCountry);

  const handleCountryChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHoursChange = (val) => {
    const numeric = parseInt(val, 10);
    if (!isNaN(numeric) && numeric >= 1 && numeric <= 100) {
      setHours(numeric);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subjectTitle =
      subjects.find((s) => s.id === formData.subjectId || s.title === formData.subjectId)?.title ||
      formData.subjectId ||
      "Not specified";

    // Construct WhatsApp message targeted to UAE number +971 54 263 2026
    const whatsappMessage = `*New Booking & Tuition Query - Alinea Online*

*Hourly Calculator Summary:*
• *Level:* ${currentRateObj.label} (${formattedHourlyRate}/hr)
• *Target Subject:* ${subjectTitle}
• *Hours Requested:* ${hours} Hour${hours > 1 ? "s" : ""}
• *Estimated Total:* ${formattedTotalPrice} (${selectedCountry.name})
• *Exam Board:* ${formData.examBoard}

*Student & Parent Contact Details:*
• *Student Name:* ${formData.studentName}
• *Parent Name:* ${formData.parentName}
• *Email:* ${formData.email}
• *Phone:* ${formData.phone}
• *Preferred Time:* ${formData.preferredTime}

*Payment Method:* Hosted Alfa Payment Gateway (Credit/Debit Card)`;

    const waUrl = `https://wa.me/971542632026?text=${encodeURIComponent(whatsappMessage)}`;
    setWhatsappRedirectUrl(waUrl);

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
            Booking Query Received!
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant leading-relaxed mb-6">
            Thank you <strong>{formData.parentName || "there"}</strong>. We are redirecting you to our
            academic team on WhatsApp. You will receive your hosted Alfa Payment Gateway checkout link to
            confirm your <strong>{hours} hour{hours > 1 ? "s" : ""}</strong> of {currentRateObj.label} tutoring.
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
            Direct WhatsApp Academic Team: +971 54 263 2026
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
          <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wider text-on-surface-variant flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-[#c0392b]"></span> Flat Hourly Rates • No Hidden Fees
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl sm:text-5xl md:text-6xl text-on-background mb-4 leading-tight">
            Transparent Tuition Pricing
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Simple, honest flat hourly pricing for IGCSE and A-Level. Book exactly the hours you need,
            with uniform rates across all exam boards and direct examiner tuition.
          </p>
        </div>
      </section>

      {/* Main Pricing & Calculator Area */}
      <section className="py-12 md:py-16 px-6 max-w-container-max mx-auto">
        {/* Country & Currency Selector Bar */}
        <div className="bg-white rounded-2xl p-5 border-2 border-line neo-brutalist-shadow mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container border border-on-background flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5 text-on-background" />
            </div>
            <div>
              <p className="font-['Work_Sans'] font-bold text-sm text-on-background">
                Select Your Region &amp; Currency
              </p>
              <p className="font-['IBM_Plex_Mono'] text-xs text-muted">
                Prices automatically adjust to official pegged &amp; regional rates
              </p>
            </div>
          </div>

          <div className="w-full sm:w-72">
            <select
              value={selectedCountryCode}
              onChange={handleCountryChange}
              className="w-full font-['Work_Sans'] text-sm font-semibold bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.currency} — {country.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2 Flat Rate Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* IGCSE / GCSE Card */}
          <div
            onClick={() => setSelectedLevelKey("IGCSE")}
            className={`p-8 rounded-3xl border-2 transition-all cursor-pointer relative ${
              selectedLevelKey === "IGCSE"
                ? "bg-on-background text-white border-on-background shadow-[8px_8px_0_0_var(--color-primary-container)]"
                : "bg-white border-line hover:border-on-background/40 hover:bg-[#fbf9f4]"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  selectedLevelKey === "IGCSE"
                    ? "bg-primary-container text-on-background"
                    : "bg-[#faf8f2] text-on-surface-variant border border-line"
                }`}
              >
                Years 9–11 / Grades 9–10
              </span>
              <span className="font-['IBM_Plex_Mono'] text-xs text-muted">
                All Exam Boards
              </span>
            </div>
            <h2 className={`font-['Archivo_Black'] text-2xl md:text-3xl mb-2 ${selectedLevelKey === "IGCSE" ? "text-white" : "text-on-background"}`}>
              IGCSE / GCSE Tuition
            </h2>
            <p className={`font-['Work_Sans'] text-sm mb-6 ${selectedLevelKey === "IGCSE" ? "text-surface-variant" : "text-on-surface-variant"}`}>
              Economics, Business, Mathematics, Sciences &amp; English. Complete mark-scheme mastery.
            </p>
            <div className="flex items-baseline gap-2 pt-4 border-t border-line/40">
              <span className={`font-['Archivo_Black'] text-4xl sm:text-5xl ${selectedLevelKey === "IGCSE" ? "text-primary-container" : "text-[#c0392b]"}`}>
                {formatPrice(HOURLY_RATES.IGCSE.rateUSD, selectedCountry)}
              </span>
              <span className={`font-['Work_Sans'] font-bold text-sm ${selectedLevelKey === "IGCSE" ? "text-white/80" : "text-on-surface-variant"}`}>
                / hour
              </span>
              {selectedCountry.code !== "OTHER" && (
                <span className={`text-xs ml-auto font-['IBM_Plex_Mono'] ${selectedLevelKey === "IGCSE" ? "text-white/60" : "text-muted"}`}>
                  (Base: $27 USD/hr)
                </span>
              )}
            </div>
          </div>

          {/* AS-Level & A2 Card */}
          <div
            onClick={() => setSelectedLevelKey("A_LEVEL")}
            className={`p-8 rounded-3xl border-2 transition-all cursor-pointer relative ${
              selectedLevelKey === "A_LEVEL"
                ? "bg-on-background text-white border-on-background shadow-[8px_8px_0_0_var(--color-primary-container)]"
                : "bg-white border-line hover:border-on-background/40 hover:bg-[#fbf9f4]"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  selectedLevelKey === "A_LEVEL"
                    ? "bg-primary-container text-on-background"
                    : "bg-[#faf8f2] text-on-surface-variant border border-line"
                }`}
              >
                Years 12–13 / Sixth Form
              </span>
              <span className="font-['IBM_Plex_Mono'] text-xs text-muted">
                Edexcel, CAIE, AQA, OCR, IB
              </span>
            </div>
            <h2 className={`font-['Archivo_Black'] text-2xl md:text-3xl mb-2 ${selectedLevelKey === "A_LEVEL" ? "text-white" : "text-on-background"}`}>
              AS-Level &amp; A2 Tuition
            </h2>
            <p className={`font-['Work_Sans'] text-sm mb-6 ${selectedLevelKey === "A_LEVEL" ? "text-surface-variant" : "text-on-surface-variant"}`}>
              Advanced evaluation essays, mathematical proofs, synoptic questions &amp; examiner audits.
            </p>
            <div className="flex items-baseline gap-2 pt-4 border-t border-line/40">
              <span className={`font-['Archivo_Black'] text-4xl sm:text-5xl ${selectedLevelKey === "A_LEVEL" ? "text-primary-container" : "text-[#c0392b]"}`}>
                {formatPrice(HOURLY_RATES.A_LEVEL.rateUSD, selectedCountry)}
              </span>
              <span className={`font-['Work_Sans'] font-bold text-sm ${selectedLevelKey === "A_LEVEL" ? "text-white/80" : "text-on-surface-variant"}`}>
                / hour
              </span>
              {selectedCountry.code !== "OTHER" && (
                <span className={`text-xs ml-auto font-['IBM_Plex_Mono'] ${selectedLevelKey === "A_LEVEL" ? "text-white/60" : "text-muted"}`}>
                  (Base: $32 USD/hr)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Hourly Calculator & 5-Step Flow Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Calculator & Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-line neo-brutalist-shadow">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line">
                <div className="w-10 h-10 rounded-xl bg-primary-container border border-on-background flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5 text-on-background" />
                </div>
                <div>
                  <h3 className="font-['Archivo_Black'] text-xl text-on-background">
                    Interactive Hourly Calculator
                  </h3>
                  <p className="font-['Work_Sans'] text-xs text-on-surface-variant">
                    Customize your tutoring plan and see your exact total upfront
                  </p>
                </div>
              </div>

              {/* Step A: Select Level */}
              <div className="mb-6">
                <label className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-on-surface-variant font-bold block mb-2.5">
                  1. Select Academic Level *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedLevelKey("IGCSE")}
                    className={`py-3 px-4 rounded-xl font-['Work_Sans'] font-bold text-sm border-2 text-center transition-all cursor-pointer ${
                      selectedLevelKey === "IGCSE"
                        ? "bg-on-background text-white border-on-background neo-brutalist-shadow"
                        : "bg-[#faf8f2] text-on-surface-variant border-line hover:border-on-background/40"
                    }`}
                  >
                    IGCSE / GCSE ($27/hr)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLevelKey("A_LEVEL")}
                    className={`py-3 px-4 rounded-xl font-['Work_Sans'] font-bold text-sm border-2 text-center transition-all cursor-pointer ${
                      selectedLevelKey === "A_LEVEL"
                        ? "bg-on-background text-white border-on-background neo-brutalist-shadow"
                        : "bg-[#faf8f2] text-on-surface-variant border-line hover:border-on-background/40"
                    }`}
                  >
                    AS-Level &amp; A2 ($32/hr)
                  </button>
                </div>
              </div>

              {/* Step B: Select Number of Hours */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                    2. Number of Hours *
                  </label>
                  <span className="font-['Archivo_Black'] text-lg text-[#c0392b]">
                    {hours} Hour{hours > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Quick select buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[1, 2, 5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setHours(num)}
                      className={`px-4 py-2 rounded-xl text-xs font-['IBM_Plex_Mono'] font-bold border-2 transition-all cursor-pointer ${
                        hours === num
                          ? "bg-primary-container text-on-background border-on-background font-black shadow-sm"
                          : "bg-white text-on-surface-variant border-line hover:border-on-background/40"
                      }`}
                    >
                      {num} hr{num > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={hours}
                  onChange={(e) => handleHoursChange(e.target.value)}
                  className="w-full accent-on-background cursor-pointer"
                />
              </div>

              {/* Live Cost Summary Strip */}
              <div className="bg-[#f5f2e9] rounded-2xl p-5 border-2 border-on-background mb-8 flex items-center justify-between">
                <div>
                  <p className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant">
                    {hours} hrs × {formattedHourlyRate}
                  </p>
                  <p className="font-['Work_Sans'] font-bold text-xs text-muted">
                    Uniform rate across all exam boards
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider font-bold text-on-surface-variant">
                    Total In {selectedCountry.currency}
                  </p>
                  <p className="font-['Archivo_Black'] text-3xl text-on-background">
                    {formattedTotalPrice}
                  </p>
                </div>
              </div>

              {/* Step C: Inquiry Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h4 className="font-['Archivo_Black'] text-lg text-on-background mb-1">
                  3. Student &amp; Booking Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Zain Al-Mansoor"
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Mrs. Sarah"
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@example.com"
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+971 50 123 4567"
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Target Subject *
                    </label>
                    <select
                      name="subjectId"
                      value={formData.subjectId}
                      onChange={handleChange}
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors cursor-pointer"
                    >
                      {subjects.length > 0 ? (
                        subjects.map((s) => (
                          <option key={s.id} value={s.title || s.id}>
                            {s.title}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="Economics">Economics</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Biology">Biology</option>
                          <option value="Business Studies">Business Studies</option>
                          <option value="English Language">English Language</option>
                          <option value="English Literature">English Literature</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Exam Board Specification *
                    </label>
                    <select
                      name="examBoard"
                      value={formData.examBoard}
                      onChange={handleChange}
                      className="font-['Work_Sans'] text-sm bg-[#faf8f2] border-2 border-line rounded-xl px-4 py-3 text-on-background focus:border-on-background focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Edexcel (Pearson)">Edexcel (Pearson)</option>
                      <option value="AQA">AQA</option>
                      <option value="Cambridge (CAIE)">Cambridge (CAIE)</option>
                      <option value="OCR">OCR</option>
                      <option value="IB">IB</option>
                      <option value="AP">AP</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-base py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Query...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          Submit Query &amp; Request Alfa Payment Link ({formattedTotalPrice})
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="font-['Work_Sans'] text-xs text-muted text-center mt-3">
                    Instant WhatsApp confirmation to our Academic Team (+971 54 263 2026).
                    No immediate charge today.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: 5-Step Alfa Payment Gateway Flow (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            <div className="bg-on-background text-white rounded-3xl p-6 sm:p-8 border-2 border-on-background neo-brutalist-shadow">
              <div className="flex items-center gap-2.5 mb-2">
                <CreditCard className="w-5 h-5 text-primary-container" />
                <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-primary-container uppercase tracking-wider">
                  Alfa Payment Gateway
                </span>
              </div>
              <h3 className="font-['Archivo_Black'] text-2xl text-white mb-3 leading-snug">
                How Our Booking &amp; Payment Flow Works
              </h3>
              <p className="font-['Work_Sans'] text-sm text-surface-variant leading-relaxed mb-6">
                A seamless, secure 5-step checkout designed for international families across the GCC and Asia.
              </p>

              {/* 5-Step Vertical Timeline */}
              <div className="flex flex-col gap-5 border-t border-white/15 pt-6">
                {BOOKING_STEPS_FLOW.map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-background flex items-center justify-center font-['Archivo_Black'] text-sm shrink-0 border border-on-background">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-['Work_Sans'] font-bold text-sm text-white mb-0.5">
                        {item.title}
                      </h4>
                      <p className="font-['Work_Sans'] text-xs text-surface-variant leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secure Trust Badges */}
              <div className="mt-8 pt-6 border-t border-white/15 flex flex-col gap-2.5 font-['Work_Sans'] text-xs text-surface-variant">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>256-Bit SSL Encrypted Card Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  <span>No payment gateway account or registration required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                  <span>Hosted Bank Alfalah checkout link sent straight to your email / WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Quick Action to Dedicated Booking Page */}
            <div className="bg-[#f5f2e9] rounded-2xl p-6 border-2 border-line flex items-center justify-between gap-4">
              <div>
                <h4 className="font-['Archivo_Black'] text-sm text-on-background mb-1">
                  Prefer a Specialist Tutor Match?
                </h4>
                <p className="font-['Work_Sans'] text-xs text-on-surface-variant">
                  Explore available time slots and faculty profiles on our consultation page.
                </p>
              </div>
              <Link
                href="/booking"
                className="bg-on-background text-white font-['Work_Sans'] font-bold text-xs px-4 py-2.5 rounded-full whitespace-nowrap hover:bg-inverse-surface transition-colors shrink-0"
              >
                Go to Booking →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
