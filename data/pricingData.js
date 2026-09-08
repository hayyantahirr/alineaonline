/**
 * Pricing Data for Alinea Online
 * 
 * Re-exports modern flat hourly rates and centralized currency mappings
 * from `@/constants/currencies`.
 */

import {
  COUNTRIES,
  HOURLY_RATES,
  BOOKING_STEPS_FLOW,
  formatPrice,
  convertPrice,
  getCountryByCode,
  detectCountryFromTimezone,
} from "@/constants/currencies";

export {
  COUNTRIES as countries,
  HOURLY_RATES as hourlyRates,
  BOOKING_STEPS_FLOW as bookingSteps,
  formatPrice,
  convertPrice,
  getCountryByCode,
  detectCountryFromTimezone,
};

// Deprecated legacy packages placeholder maintained for backwards compatibility if needed
export const packages = [];
