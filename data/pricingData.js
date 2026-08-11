export const packages = [
  {
    id: "diagnostic",
    title: "Diagnostic Session",
    sessions: 1,
    basePrice: 50, // Base price in USD
    description:
      "A comprehensive 1-hour session to assess your current level and identify gap areas.",
    features: [
      "1-on-1 Academic Assessment",
      "Gap Analysis Report",
      "Personalized Revision Roadmap",
    ],
    popular: false,
  },
  {
    id: "crash-course",
    title: "Crash Course",
    sessions: 5,
    basePrice: 235, // 5% discount
    description:
      "Intensive focus on specific modules or exam techniques before finals.",
    features: [
      "Targeted Module Review",
      "Model Answer Walkthroughs",
      "2 Marked Assignments",
    ],
    popular: true,
  },
  {
    id: "mastery-bundle",
    title: "Mastery Bundle",
    sessions: 10,
    basePrice: 450, // 10% discount
    description:
      "Long-term support for consistent grade improvement and exam readiness.",
    features: [
      "Full Syllabus Coverage",
      "Weekly Marked Timed Papers",
      "Direct Examiner Feedback",
      "24/7 Academic Support Access",
    ],
    popular: false,
  },
];

export const countries = [
  {
    code: "AE",
    name: "United Arab Emirates",
    currency: "AED",
    symbol: "AED",
    rate: 3.67,
    timezone: "GST",
    utcOffset: "+04:00",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    currency: "SAR",
    symbol: "SAR",
    rate: 3.75,
    timezone: "AST",
    utcOffset: "+03:00",
  },
  {
    code: "QA",
    name: "Qatar",
    currency: "QAR",
    symbol: "QAR",
    rate: 3.64,
    timezone: "AST",
    utcOffset: "+03:00",
  },
  {
    code: "OM",
    name: "Oman",
    currency: "OMR",
    symbol: "OMR",
    rate: 0.385,
    timezone: "GST",
    utcOffset: "+04:00",
  },
  {
    code: "BH",
    name: "Bahrain",
    currency: "BHD",
    symbol: "BHD",
    rate: 0.377,
    timezone: "AST",
    utcOffset: "+03:00",
  },
  {
    code: "KW",
    name: "Kuwait",
    currency: "KWD",
    symbol: "KWD",
    rate: 0.308,
    timezone: "AST",
    utcOffset: "+03:00",
  },
  {
    code: "UK",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    rate: 0.79,
    timezone: "BST/GMT",
    utcOffset: "+00:00",
  },
  {
    code: "OTHER",
    name: "Other (International)",
    currency: "USD",
    symbol: "$",
    rate: 1,
    timezone: "Local",
    utcOffset: "",
  },
];
