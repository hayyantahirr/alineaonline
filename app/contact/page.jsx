"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Send, Clock, MapPin, Mail, Loader2 } from "lucide-react";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      console.log("Submitting contact form to Firestore database...", formData);
      const docRef = await addDoc(collection(db, "contact_messages"), {
        parentName: formData.parentName,
        studentName: formData.studentName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
        status: "unread",
      });
      console.log("Contact message saved successfully with Document ID:", docRef.id);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Firestore submission error:", err);
      const detail = err.code ? `[${err.code}] ${err.message}` : err.message;
      setErrorMessage(
        `Firebase Error: ${detail || "Could not save message to Firestore."}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const socialChannels = [
    {
      name: "WhatsApp",
      description: "Chat with our academic team directly. Fastest response.",
      href: "https://wa.me/+923322348565",
      color: "bg-success",
      hoverColor: "hover:bg-success-dark",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      tag: "Replies within 1 hour",
    },
    {
      name: "Instagram",
      description:
        "Follow us for exam tips, reels, and student success stories.",
      href: "https://www.instagram.com/alineaonline",
      color: "bg-[#E1306C]",
      hoverColor: "hover:bg-[#c82860]",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      tag: "Weekly exam content",
    },
    {
      name: "Facebook",
      description: "Join our parent community for updates and exam resources.",
      href: "https://www.facebook.com/alineaonline",
      color: "bg-[#1877F2]",
      hoverColor: "hover:bg-[#1565d8]",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      tag: "Parent community",
    },
    {
      name: "Email",
      description: "For formal enquiries, partnerships, and documentation.",
      href: "mailto:info@alineaonline.com",
      color: "bg-on-background",
      hoverColor: "hover:bg-inverse-surface",
      icon: <Mail className="w-6 h-6" />,
      tag: "24-48 hour response",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="w-full bg-background text-on-background">
        <section className="py-24 md:py-32 px-6 max-w-container-max mx-auto">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-on-background neo-brutalist-shadow">
              <CheckCircle2 className="w-10 h-10 text-on-background" />
            </div>
            <h1 className="font-['Archivo_Black'] text-3xl md:text-4xl text-on-background mb-4">
              Message Received!
            </h1>
            <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant leading-relaxed mb-8">
              Thank you <strong>{formData.parentName || "there"}</strong>. Our
              academic team will review your message and get back to you within{" "}
              <strong>24 hours</strong>. For urgent matters, reach us directly
              on WhatsApp.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    parentName: "",
                    studentName: "",
                    email: "",
                    phone: "",
                    subject: "General Enquiry",
                    message: "",
                  });
                }}
                className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm px-8 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5"
              >
                Send Another Message
              </button>
              <Link
                href="/"
                className="bg-transparent text-on-background font-['Work_Sans'] font-extrabold text-sm px-8 py-4 rounded-full border-2 border-on-background hover:bg-surface-container transition-colors duration-200"
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
    <div className="w-full bg-background text-on-background">
      {/* Page Header */}
      <section className="bg-on-background text-white py-14 px-6 border-b-4 border-primary-container">
        <div className="max-w-container-max mx-auto text-center">
          <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            REACH OUT TO US
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl md:text-5xl text-primary-container mt-3 mb-3">
            Get In Touch
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-surface-variant max-w-xl mx-auto">
            Whether you&apos;re a parent, student, or prospective teacher —
            we&apos;re here to help. Pick the channel that suits you best.
          </p>
        </div>
      </section>

      {/* Social Channels Grid */}
      <section className="py-16 px-6 max-w-container-max mx-auto">
        <div className="mb-12">
          <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-primary-container"></span> Connect
            With Us
          </span>
          <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl text-on-background">
            Choose your preferred channel.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {socialChannels.map((channel) => (
            <a
              key={channel.name}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-line bg-white rounded-2xl p-6 flex flex-col gap-4 hover:border-on-background hover:shadow-[6px_6px_0_0_var(--color-on-background)] transition-all duration-200 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 ${channel.color} ${channel.hoverColor} text-white rounded-xl flex items-center justify-center transition-colors duration-200`}
              >
                {channel.icon}
              </div>
              <div>
                <h3 className="font-['Work_Sans'] font-bold text-on-background text-lg mb-1">
                  {channel.name}
                </h3>
                <p className="font-['Work_Sans'] text-sm text-on-surface-variant leading-relaxed">
                  {channel.description}
                </p>
              </div>
              <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-primary px-3 py-1 bg-surface-container-low rounded-full w-max border border-line">
                {channel.tag}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form + Info Section */}
      <section className="py-16 px-6 max-w-container-max mx-auto border-t-2 border-line">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-7">
            <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-primary-container"></span> Send Us a
              Message
            </span>
            <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl text-on-background mb-2">
              Write to us{" "}
              <span className="relative inline-block text-on-background">
                directly.
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 text-[#c0392b]"
                  viewBox="0 0 100 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 25 2, 75 10, 98 4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="font-['Work_Sans'] text-sm text-on-surface-variant mb-8">
              Fill in the form below and our academic coordinator will respond
              within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sarah Ahmed"
                    className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Omar Ahmed"
                    className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    placeholder="parent@email.com"
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
                    placeholder="+971 50 123 4567"
                    className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background focus:border-on-background focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option>General Enquiry</option>
                  <option>Enrolment &amp; Fees</option>
                  <option>IGCSE Preparation</option>
                  <option>A-Level Preparation</option>
                  <option>IB Diploma Support</option>
                  <option>Become a Teacher</option>
                  <option>Partnership / Collaboration</option>
                  <option>Technical Issue</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-['Work_Sans'] font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your child's current level, target grades, and how we can help..."
                  className="font-['Work_Sans'] text-sm bg-white border-2 border-line rounded-xl px-4 py-3.5 text-on-background placeholder:text-muted focus:border-on-background focus:outline-none transition-colors resize-none"
                />
              </div>

              {errorMessage && (
                <p className="font-['Work_Sans'] text-sm text-[#c0392b] font-bold bg-[#c0392b]/10 p-3.5 rounded-xl border border-[#c0392b]/30">
                  {errorMessage}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm px-8 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 w-max disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Info Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Quick Info Card */}
            <div className="bg-surface-container-low rounded-2xl border-2 border-line p-6 md:p-8">
              <h3 className="font-['Archivo_Black'] text-lg text-on-background mb-6">
                Quick Information
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-container border border-on-background flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-on-background" />
                  </div>
                  <div>
                    <p className="font-['Work_Sans'] font-bold text-sm text-on-background">
                      Working Hours
                    </p>
                    <p className="font-['Work_Sans'] text-sm text-on-surface-variant">
                      Monday – Saturday
                    </p>
                    <p className="font-['Work_Sans'] text-sm text-on-surface-variant">
                      10:00 AM – 9:00 PM (GST)
                    </p>
                  </div>
                </div>

                <div className="border-t border-line" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-container border border-on-background flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-on-background" />
                  </div>
                  <div>
                    <p className="font-['Work_Sans'] font-bold text-sm text-on-background">
                      Serving Students In
                    </p>
                    <p className="font-['Work_Sans'] text-sm text-on-surface-variant">
                      UAE · Saudi Arabia · Qatar · Pakistan · Bahrain
                    </p>
                  </div>
                </div>

                <div className="border-t border-line" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-container border border-on-background flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-on-background" />
                  </div>
                  <div>
                    <p className="font-['Work_Sans'] font-bold text-sm text-on-background">
                      Email
                    </p>
                    <a
                      href="mailto:info@alineaonline.com"
                      className="font-['Work_Sans'] text-sm text-primary-container font-bold underline underline-offset-4 hover:text-primary-fixed transition-colors"
                    >
                      info@alineaonline.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Times Card */}
            <div className="bg-on-background text-white rounded-2xl border-2 border-on-background p-6 md:p-8">
              <h3 className="font-['Archivo_Black'] text-lg text-primary-container mb-4">
                Expected Response Times
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-['Work_Sans'] text-sm text-surface-variant">
                    WhatsApp
                  </span>
                  <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full">
                    &lt; 1 hour
                  </span>
                </div>
                <div className="border-t border-white/10" />
                <div className="flex items-center justify-between">
                  <span className="font-['Work_Sans'] text-sm text-surface-variant">
                    Contact Form
                  </span>
                  <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-primary-container bg-primary-container/10 px-3 py-1 rounded-full">
                    &lt; 24 hours
                  </span>
                </div>
                <div className="border-t border-white/10" />
                <div className="flex items-center justify-between">
                  <span className="font-['Work_Sans'] text-sm text-surface-variant">
                    Email
                  </span>
                  <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-surface-variant bg-white/5 px-3 py-1 rounded-full">
                    24-48 hours
                  </span>
                </div>
              </div>
            </div>

            {/* Encouragement */}
            <div className="bg-primary-container rounded-2xl border-2 border-on-background p-6 md:p-8 shadow-[6px_6px_0_0_var(--color-on-background)]">
              <h3 className="font-['Archivo_Black'] text-lg text-on-background mb-2">
                Not sure what to ask?
              </h3>
              <p className="font-['Work_Sans'] text-sm text-on-primary-container leading-relaxed mb-4">
                Most parents start with: &quot;My child is doing [subject] at
                [level] and we want to reach [grade]. Can you help?&quot; — and
                yes, we almost always can.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 font-['Work_Sans'] font-bold text-sm text-on-background border-b-2 border-on-background pb-0.5 hover:text-primary transition-colors"
              >
                Or skip ahead and book a session →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
