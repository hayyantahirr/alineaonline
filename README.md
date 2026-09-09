# Alinea Online

Alinea Online is a premium, specialized tutoring platform focused exclusively on IGCSE, GCSE, and A-Level preparations. Tailored primarily for students across the GCC and Asia, Alinea connects learners with examiner-trained subject specialists through live, 1:1 sessions, operating on a strictly mark-scheme-first methodology.

## Key Features

* **Premium 1:1 Live Sessions:** Focused, individualized learning environments on Zoom. No pre-recorded videos, no large groups—just direct academic attention.
* **Examiner-Trained Faculty:** Every tutor is a subject specialist rigorously vetted by the Academic Director. Lessons are structured directly from official examiner reports.
* **Transparent, Seamless Booking System:** An interactive, 5-step booking flow that guides parents from selecting subjects and hours to a seamless checkout process.
* **Dynamic Global Pricing:** An intelligent, localized pricing calculator that automatically detects a user's location to display tailored flat hourly rates in their local currency.
* **Revision Vault:** A dedicated resource hub providing high-value, downloadable revision materials such as evaluation essay blueprints, formula vaults, and keyword mapping guides.
* **Teacher Application Portal:** A dedicated recruitment flow for onboarding elite educators.

## Technical Architecture

Built for high performance, dynamic routing, and exceptional SEO, the Alinea Online frontend is a modern web application designed with an emphasis on a premium user experience and robust conversion funnels.

### Tech Stack
* **Core Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Frontend Library:** React.js (Pure JavaScript/JSX architecture)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a highly responsive, bespoke design system with fluid typography and micro-animations.
* **Backend Integration:** Firebase/Firestore (Handling booking payloads and inquiries via API routes).
* **Payment Gateway:** Alfa Payment Gateway Integration.
* **Icons & UI:** [Lucide React](https://lucide.dev/).

### System Highlights
* **IP-Based Geo-Location:** Custom API routing dynamically handles international users, assigning correct base currencies and applying exact exchange multipliers (e.g., GCC pegged currencies vs. floating) on the fly.
* **Advanced SEO & Structured Data:** Deeply integrated metadata, optimal heading structures, and automated JSON-LD Schema.org rich snippets (e.g., `FAQPage`) to ensure maximum visibility on Google, particularly for local search intents in target cities.
* **Server-Side Rendering (SSR) Optimization:** Strategic separation of Server and Client Components to minimize bundle sizes while preserving rich, interactive client-side elements like pricing calculators and accordions.
* **Data Decoupling:** Dedicated static data controllers decouple complex logic (like pricing models and resource files) from presentation components, ensuring rapid UI iteration.

## Getting Started

### Prerequisites
* Node.js 18.x or later

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alineaonline
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and configure your Firebase keys, Alfa Gateway credentials, and Geo-IP tokens.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

* `/app` - Next.js App Router endpoints, individual pages, layouts, and API routes.
* `/components` - Modular React components categorized by feature (`/home`, UI elements).
* `/constants` - Global configurations (e.g., currency multipliers).
* `/data` - Decoupled static data sets for blogs, pricing, and FAQs.
* `/public` - Static assets, images, and fonts.
