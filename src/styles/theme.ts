import type { Theme } from "../types";

const theme: Theme = {
  breakpoints: {
    mobile: "375px",
    tablet: "768px",
    smallDesktop: "991px",
    desktop: "1200px",
  },

  media: {
    mobile: "@media (min-width: 375px)",
    tablet: "@media (min-width: 768px)",
    smallDesktop: "@media (min-width: 991px)",
    desktop: "@media (min-width: 1200px)",
  },

  colors: {
    primary: "#1078d7",
    secondary: "#6c757d",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    light: "#f8f9fa",
    dark: "#0a1929",
    darkBlue: "#0d1b2a",
    navy: "#001529",
    white: "#ffffff",
    black: "#000000",
    text: "#333333",
    textLight: "#6c757d",
    textWhite: "#ffffff",
    background: "#ffffff",
    border: "#dee2e6",
    borderLight: "rgba(255, 255, 255, 0.1)",
    overlay: "rgba(0, 0, 0, 0.4)",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    xxxl: "2rem",
    huge: "3.75rem",
  },

  fonts: {
    body: "'Gilroy', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading:
      "'Gilroy', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },

  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },

  transitions: {
    fast: "150ms ease-in-out",
    normal: "300ms ease-in-out",
    slow: "500ms ease-in-out",
  },
};

export { theme };
