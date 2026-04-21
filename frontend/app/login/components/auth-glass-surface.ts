import type { CSSProperties } from "react";

/** Figma-style glass card: fill + gradient border + backdrop blur. */
export const authGlassCardStyle: CSSProperties = {
  border: "1px solid transparent",
  borderRadius: "1.5rem",
  backgroundImage: `
    linear-gradient(138.02deg, #242424 8.2%, rgba(36, 36, 36, 0.3) 91.8%),
    linear-gradient(130.98deg, rgba(255, 255, 255, 0.1) 0.49%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 74.76%, rgba(255, 255, 255, 0.1) 99.51%)
  `,
  backgroundOrigin: "padding-box, border-box",
  backgroundClip: "padding-box, border-box",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};
