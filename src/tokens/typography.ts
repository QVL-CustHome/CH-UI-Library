// Typographie de marque CustHome (US-7.5) : Chivo (400 corps, 700 titres),
// échelle de titres en ratio 1.333 (perfect fourth), corps 1rem.
export const typography = {
  fontFamily: "'Chivo', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  fontSize: {
    xs: "0.75rem",
    sm: "0.9rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    xxl: "2rem",
  },
  heading: {
    h1: "4.21rem",
    h2: "3.158rem",
    h3: "2.369rem",
    h4: "1.777rem",
    h5: "1.333rem",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;
