/**
 * Currencies & Pricing Configuration for Alinea Online
 * 
 * Rates are relative to 1.0 USD base.
 * Pegged GCC currencies use official fixed pegs.
 * Floating currencies (GBP, SGD, HKD) have calibrated initial multipliers.
 */

export const BASE_CURRENCY = "USD";

export const HOURLY_RATES = {
  IGCSE: {
    id: "igcse",
    label: "IGCSE / GCSE",
    description: "Years 9–11 / Grades 9 & 10",
    rateUSD: 27,
  },
  A_LEVEL: {
    id: "alevel",
    label: "AS-Level & A2",
    description: "Years 12–13 / Grades 11 & 12",
    rateUSD: 32,
  },
};

export const COUNTRIES = [
  {
    code: "AE",
    name: "United Arab Emirates",
    currency: "AED",
    symbol: "AED",
    rate: 3.67,
    timezone: "GST",
    utcOffset: "+04:00",
    decimals: 0,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    currency: "SAR",
    symbol: "SAR",
    rate: 3.75,
    timezone: "AST",
    utcOffset: "+03:00",
    decimals: 0,
  },
  {
    code: "QA",
    name: "Qatar",
    currency: "QAR",
    symbol: "QAR",
    rate: 3.64,
    timezone: "AST",
    utcOffset: "+03:00",
    decimals: 0,
  },
  {
    code: "OM",
    name: "Oman",
    currency: "OMR",
    symbol: "OMR",
    rate: 0.385,
    timezone: "GST",
    utcOffset: "+04:00",
    decimals: 3,
  },
  {
    code: "BH",
    name: "Bahrain",
    currency: "BHD",
    symbol: "BHD",
    rate: 0.377,
    timezone: "AST",
    utcOffset: "+03:00",
    decimals: 3,
  },
  {
    code: "KW",
    name: "Kuwait",
    currency: "KWD",
    symbol: "KWD",
    rate: 0.308,
    timezone: "AST",
    utcOffset: "+03:00",
    decimals: 3,
  },
  {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    rate: 0.79,
    timezone: "BST/GMT",
    utcOffset: "+00:00",
    decimals: 2,
  },
  {
    code: "SG",
    name: "Singapore",
    currency: "SGD",
    symbol: "S$",
    rate: 1.35,
    timezone: "SGT",
    utcOffset: "+08:00",
    decimals: 2,
  },
  {
    code: "HK",
    name: "Hong Kong",
    currency: "HKD",
    symbol: "HK$",
    rate: 7.80,
    timezone: "HKT",
    utcOffset: "+08:00",
    decimals: 2,
  },
  {
    code: "OTHER",
    name: "International (USD)",
    currency: "USD",
    symbol: "$",
    rate: 1.0,
    timezone: "Local",
    utcOffset: "",
    decimals: 2,
  },
];

/**
 * 5-Step Alfa Payment Gateway Booking Flow
 */
export const BOOKING_STEPS_FLOW = [
  {
    step: 1,
    title: "Select Hours, Level & Subject",
    description: "Choose your academic level, subject focus, and required hours.",
  },
  {
    step: 2,
    title: "Submit Query",
    description: "Submit your consultation request with your syllabus and preferred slot.",
  },
  {
    step: 3,
    title: "Receive Alfa Payment Link",
    description: "Our academic team sends you an official Alfa Payment Gateway invoice link.",
  },
  {
    step: 4,
    title: "Pay Securely by Card",
    description: "Pay securely via credit/debit card — no payment gateway account required.",
  },
  {
    step: 5,
    title: "Instant Confirmation",
    description: "Receive instant on-screen and email confirmation of your booked sessions.",
  },
];

/**
 * Convert USD price to local currency using multiplier
 */
export function convertPrice(basePriceUSD, countryOrRate) {
  const rate = typeof countryOrRate === "number" ? countryOrRate : countryOrRate?.rate || 1.0;
  return basePriceUSD * rate;
}

/**
 * Format price according to currency conventions
 */
export function formatPrice(basePriceUSD, country) {
  if (!country) return `$${basePriceUSD}`;
  const converted = convertPrice(basePriceUSD, country.rate);
  const decimals = country.decimals !== undefined ? country.decimals : 0;
  
  const formattedNumber = converted.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${country.symbol} ${formattedNumber}`;
}

/**
 * Find country configuration by code (e.g. 'AE', 'GB', 'SG')
 */
export function getCountryByCode(code) {
  if (!code) return COUNTRIES.find((c) => c.code === "OTHER");
  const normalized = code.toUpperCase();
  // Map UK alias to GB
  const searchCode = normalized === "UK" ? "GB" : normalized;
  return COUNTRIES.find((c) => c.code === searchCode) || COUNTRIES.find((c) => c.code === "OTHER");
}

/**
 * Client-side fallback to guess country code from browser timezone
 */
export function detectCountryFromTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Dubai") || tz.includes("Abu_Dhabi") || tz.includes("Muscat")) {
      return tz.includes("Muscat") ? "OM" : "AE";
    }
    if (tz.includes("Riyadh")) return "SA";
    if (tz.includes("Qatar")) return "QA";
    if (tz.includes("Bahrain")) return "BH";
    if (tz.includes("Kuwait")) return "KW";
    if (tz.includes("London")) return "GB";
    if (tz.includes("Singapore")) return "SG";
    if (tz.includes("Hong_Kong")) return "HK";
  } catch (e) {
    // Ignore timezone detection errors
  }
  return "OTHER";
}
