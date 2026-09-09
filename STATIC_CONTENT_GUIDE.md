# Static Content Setup Guide for Developers

This document provides a comprehensive overview of all **static (hardcoded) information** in the Alinea Online web application. 

Unlike dynamic features (such as blog posts, teacher profiles, dynamic subject dropdowns, and form submissions) which are managed dynamically via Firebase Firestore, the static content listed below is built directly into the codebase and **must be updated by developers within the source code**.

> **Note**: The entire codebase strictly uses pure JavaScript (`.js` / `.jsx`). Do not introduce TypeScript.

---

## 1. Global Navigation & Layout (Applies Across All Pages)

### 1.1 Header & Navbar
- **File Location**: [`components/Navbar.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/Navbar.jsx)
- **Static Content**:
  - **Logo**: Header brand logo ([`/public/logo.png`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/public/logo.png)).
  - **Navigation Links**: Link labels and destinations (`Home`, `Our Faculty`, `Subjects`, `Blog & Resources`, `Contact`, `Pricing`, `Become a Teacher`).
  - **Header CTA Button**: Text `"Book a Session"` linking to `/booking`.

### 1.2 Footer
- **File Location**: [`components/Footer.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/Footer.jsx)
- **Static Content**:
  - **Brand Tagline**: *"We don't teach the syllabus. We teach the mark scheme. Specialising in IGCSE, GCSE and A-Level preparations across the GCC and Asia."*
  - **Curriculum Badges**: `IGCSE / GCSE`, `A-LEVELS`, `IB DIPLOMA`.
  - **Social Links & Handles**: Instagram URL (`https://www.instagram.com/alineaonline`), Customer WhatsApp link (`https://wa.me/971542632026`).
  - **Get In Touch Box**: Subtitle text and button label (`"WhatsApp Academic Team"` -> `+971 54 263 2026`).
  - **Bottom Bar**: Copyright statement, legal links (`Terms`, `Privacy Policy`), and developer credit link (`powered by hayyantahirr`).

### 1.3 Floating WhatsApp Button
- **File Location**: [`components/WhatsAppButton.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/WhatsAppButton.jsx)
- **Static Content**:
  - **WhatsApp Phone Number**: `+971 54 263 2026` (`https://wa.me/971542632026`).
  - **Pre-filled Message**: *"Hello Alinea Academic Team, I would like to inquire about tutoring sessions."*
  - **Tooltip Label**: `"Chat on WhatsApp"`.

### 1.4 Global Head & Metadata
- **File Location**: [`app/layout.js`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/app/layout.js)
- **Static Content**:
  - **Page `<title>`**: `"Alinea Online | Premium IGCSE, GCSE & A-Level Tutoring — GCC & Asia"`
  - **Meta Description**: `"Small-group and 1:1 IGCSE, GCSE, A-Level & IB tutoring in Economics, Business, Maths, Sciences & English. Mark-scheme-first teaching for students across the GCC and Asia."`
  - **Google Fonts Declarations**: `Archivo Black`, `Work Sans`, `IBM Plex Mono`.

---

## 2. Homepage (`/`)

### 2.1 Hero Section
- **File Location**: [`components/home/Hero.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/home/Hero.jsx)
- **Static Content**:
  - **Top Pill Badge**: `"PREMIUM ONLINE ACADEMY"`.
  - **Main Headline**: *"We don't teach the syllabus. We teach the mark scheme."* (with red stroke underline SVG).
  - **Subtitle Paragraph**: *"A small, highly focused online academy with stringent academic oversight. Specialising in IGCSE, GCSE and A-Level preparations..."*
  - **CTA Buttons**: `"Book a Session"` and `"View Subjects"`.

### 2.2 Interactive Graded Script Graphic
- **File Location**: [`components/home/GradedScript.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/home/GradedScript.jsx)
- **Static Content**:
  - Mock exam script, examiner annotations, and score stamp.

### 2.3 Trust Strip Ticker
- **File Location**: [`components/home/TrustStrip.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/home/TrustStrip.jsx)
- **Static Content**:
  - **Active Cities Marquee**: `Dubai`, `Riyadh`, `Doha`, `Muscat`, `Singapore`, `Hong Kong`.

### 2.4 Stats Section
- **File Location**: [`components/home/Stats.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/home/Stats.jsx)
- **Static Content**:
  - **Key Statistics**:
    1. **6** — *Years Excellence*
    2. **200+** — *Alumni Worldwide*
    3. **5** — *Countries Served*
    4. **5** — *Exam Boards (Edexcel, AQA, CAIE, OCR, IB)*
  - **Verification Tags**: `Pearson Edexcel`, `AQA`, `Cambridge (CAIE)`, `OCR`, `IB Diploma`.

### 2.5 Director's Story / Founder Section
- **File Location**: [`components/home/DirectorStory.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/home/DirectorStory.jsx)
- **CTA Link**: `Meet our teaching faculty →` directing to `/faculty` to showcase the examiner-trained specialists under Khawar's direct oversight.


### 2.6 Subjects Spotlight Section
- **File Location**: [`components/home/SubjectsSpotlight.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/home/SubjectsSpotlight.jsx)

### 2.7 FAQ Section & Bottom CTA Banner
- **File Locations**: [`components/home/FaqSection.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/home/FaqSection.jsx), [`components/home/CtaBanner.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/home/CtaBanner.jsx)
- **Structured Data**: Includes dynamic Schema.org `FAQPage` JSON-LD structured data for Google FAQ rich snippet eligibility.
- Customer WhatsApp link: `https://wa.me/971542632026`.

---

## 3. Pricing (`/pricing`) & Booking (`/booking`)

### 3.1 Currency Configuration & Multipliers
- **File Location**: [`constants/currencies.js`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/constants/currencies.js)
- **Base**: `USD` (`1.0`)
- **Pegged GCC Currencies**:
  - `AED`: ×3.67
  - `SAR`: ×3.75
  - `QAR`: ×3.64
  - `OMR`: ×0.385
  - `BHD`: ×0.377
  - `KWD`: ×0.308
- **Floating / Initial Currencies**:
  - `GBP`: ×0.79
  - `SGD`: ×1.35
  - `HKD`: ×7.80
- **Geo/IP Auto-Detection Route**: [`app/api/geo/route.js`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/app/api/geo/route.js)

### 3.2 Flat Hourly Rates
- **IGCSE / GCSE**: `$27 / hour`
- **AS-Level & A2**: `$32 / hour`
- Applies uniformly across all exam boards (Edexcel, AQA, CAIE, OCR, IB, AP).

### 3.3 5-Step Alfa Payment Gateway Flow
1. Select hours, level, and subject.
2. Submit query.
3. Receive hosted Alfa Payment Gateway checkout link.
4. Pay securely by credit/debit card (no account needed).
5. Instant on-screen & email confirmation.

---

## 4. Blog & Revision Vault (`/blog`)

### 4.1 Downloadable Revision Vault Data
- **File Location**: [`data/blogData.js`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/data/blogData.js)
- **6 Free Download Packs**:
  1. **A-Level Economics Micro & Macro Model Diagram Masterpack** (`18.4 MB`)
  2. **20-Mark & 25-Mark Evaluation Essay Structuring Blueprint & Model Bank** (`12.2 MB`)
  3. **IGCSE & GCSE Economics Mark Scheme Vocabulary Cheat Sheet** (`4.8 MB`)
  4. **A-Level Pure Mathematics Formula & Trigonometric Proof Vault** (`9.6 MB`)
  5. **Paper 3 & Paper 5 Technique Guide (Physics Alternative to Practical)** (`7.1 MB`)
  6. **Biology Keyword Mapping & Synoptic Question Blueprint** (`6.5 MB`)

---

## 5. Careers Page (`/careers`)

### 5.1 Exam Board Presets
- **Preset Order**: `Edexcel (Pearson)`, `AQA`, `Cambridge (CAIE)`, `OCR`, `IB`, `AP`.

### 5.2 Teacher Recruitment Contact
- **Applicant WhatsApp**: `+92 332 2348565` (`https://wa.me/923322348565`). Strictly designated for applicant inquiries.

---

## 6. Contact Us Page (`/contact`)

### 6.1 Support Channels & Operating Hours
- **Working Hours**: `Mon–Sat, 10:00 AM – 9:00 PM GST`
- **Official Email**: `info@alineaonline.com`
- **Customer WhatsApp**: `+971 54 263 2026` (`https://wa.me/971542632026`)

---

## 7. Homepage FAQ & SEO Structured Data

### 7.1 Component & Schema
- **File Location**: [`components/home/FaqSection.jsx`](file:///d:/Coding%20Projects/Alinea/Alinea%20Online%20Frontend/alineaonline/components/home/FaqSection.jsx)
- **JSON-LD Schema**: Embedded Schema.org `FAQPage` script containing all 8 Q&As for Google rich snippets.
- **Questions (01–08)**:
  1. `01` — **Why trust Alinea?**
     > One academic director personally oversees every lesson — not a call center matching you to strangers.
  2. `02` — **How are you different?**
     > We teach the mark scheme, not just the syllabus — built from real examiner reports.
  3. `03` — **Will my child improve?**
     > Every lesson is measured against grade movement, not just effort or attendance.
  4. `04` — **Typical results?**
     > Grade C → A* in two terms is typical for Alinea students, not the exception.
  5. `05` — **How do online sessions actually work?**
     > All sessions run live, 1:1, on Zoom — no recordings, no groups, just focused teaching time.
  6. `06` — **Is my child's safety protected during online lessons?**
     > Every teacher is personally vetted by Khawar before joining Alinea — not hired through an open marketplace.
  7. `07` — **Can we try a session before committing?**
     > Yes — start with a free intro call with Khawar to discuss your child's goals, no payment required.
  8. `08` — **What if we need to reschedule or my child misses a class?**
     > Sessions can be rescheduled free of charge with advance notice, within a set window and for genuine reasons — not last-minute changes.

