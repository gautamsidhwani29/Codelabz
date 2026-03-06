const authStyles = {
  page: {
    minHeight: "100vh",
    background: "#f0f2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: { xs: "16px", md: "24px 16px" },
    fontFamily: "'Segoe UI', sans-serif",
    overflowX: "hidden",
    overFlo: "hidden",
    boxSizing: "border-box"
  },

  card: {
    position: "relative",
    display: "flex",
    width: "100%",
    maxWidth: 900,
    minHeight: 560,
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 28px 80px rgba(0,0,0,0.13)",
    background: "#fff",
  },

  half: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    p: "48px 40px",
    background: "#fff",
    boxSizing: "border-box",
    overflowY: "auto",
  },

  mobileCard: {
    width: "100%",
    maxWidth: 440,
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
    p: "36px 24px 28px",
    boxSizing: "border-box",
  },

  mobileSwitch: {
    textAlign: "center",
    mt: 3,
    fontSize: "0.875rem",
    color: "#6b7280",
  },

  mobileSwitchLink: {
    color: "#2563EB",
    fontWeight: 600,
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    height: "100%",
    background: "linear-gradient(150deg, #2563EB 0%, #1741b0 100%)",
    zIndex: 10,
    transition: "transform 0.6s cubic-bezier(0.77, 0, 0.18, 1)",
    borderRadius: "16px",
  },

  face: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s ease",
  },

  overlayInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    px: "36px",
    color: "#fff",
  },

  overlayTitle: {
    fontSize: "28px",
    fontWeight: 700,
    m: "0 0 16px 0",
    color: "#fff",
  },

  overlaySub: {
    fontSize: "14px",
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.85)",
    m: "0 0 32px 0",
    maxWidth: "230px",
  },

  overlayBtn: {
    padding: "11px 36px",
    background: "transparent",
    color: "#fff",
    border: "2px solid rgba(255,255,255,0.8)",
    borderRadius: "24px",
    fontWeight: 700,
    fontSize: "13px",
    letterSpacing: "0.1em",
    cursor: "pointer",
    "&:hover": { background: "rgba(255,255,255,0.15)" },
  },
};

const inputStyles = {

  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",       
    background: "#fff",
    boxShadow: "none",          
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",

    "& fieldset": {
      borderColor: "#e0e0e0",   
      borderWidth: "1.5px",
    },

    "&:hover fieldset": {
      borderColor: "#b0b0b0",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",  
      borderWidth: "2px",
    },
    "&.Mui-focused": {
      boxShadow: "0 0 0 3px rgba(37,99,235,0.15)",
    },

    "&.Mui-error fieldset": {
      borderColor: "#ef4444",   
    },
    "&.Mui-error": {
      boxShadow: "0 0 0 3px rgba(239,68,68,0.1)",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#9ca3af",
    fontSize: "0.95rem",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2563EB",
  },

  "& .MuiInputLabel-root.Mui-error": {
    color: "#ef4444",
  },

};
const btnSx = {
  padding: "1rem",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.2)",
    background: "transparent",
  },
};

const iconSx = {
  fb: { color: "#5269a4", fontSize: "2.4rem" },

  x: { color: "#000000", fontSize: "35px" },

  git: { color: "#5c5c5c", fontSize: "35px" },

  imageIcon: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block"
  },
  google: {
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export { authStyles, inputStyles, btnSx, iconSx };