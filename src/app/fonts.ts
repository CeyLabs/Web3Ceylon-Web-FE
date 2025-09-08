import { Figtree, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

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

// Local Carena font (uploaded under public/fonts)
// Expose as CSS variable for Tailwind usage
export const carena = localFont({
  src: [
    {
  path: "../../public/assets/fonts/Carena-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
  path: "../../public/assets/fonts/Carena-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-carena",
});
