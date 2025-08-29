import { Figtree, Instrument_Serif } from "next/font/google";

export const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-figtree",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  // Instrument Serif commonly ships as 400; include italic as well
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});
