export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.los-bio.ru";

export const APP_NAME = import.meta.env.VITE_APP_NAME || "LOS-BIO";
export const APP_TITLE =
  import.meta.env.VITE_APP_TITLE || "LOS-BIO - Биотехнологии";

export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  smallDesktop: 991,
  desktop: 1200,
} as const;

export const TRANSITIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const CACHE_TAGS = {
  SLIDES: "Slides",
  ADVANTAGES: "Advantages",
  PROJECTS: "Projects",
  PROJECT: "Project",
} as const;
