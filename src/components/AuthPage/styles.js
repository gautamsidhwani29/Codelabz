export const authStyles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: { xs: "16px", sm: "32px 16px" },
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: 480,
    background: "#fff",
    borderRadius: "16px",
    border: "0.5px solid #d4dbe6",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
    padding: { xs: "28px 20px 32px", sm: "36px 40px 40px" },
    boxSizing: "border-box",
  },

  logoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "14px",
  },

  logoBox: {
    width: 52,
    height: 52,
    background: "#2563eb",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

 heading: {
    fontSize: "32px", 
    fontWeight: 700,  
    color: "#111827", 
    textAlign: "center",
    marginTop: "16px", 
    marginBottom: "8px", 
    letterSpacing: "-0.5px", 
  },
  
  subheading: {
    fontSize: "16px", 
    fontWeight: 400,
    color: "#6b7280", 
    textAlign: "center",
    marginBottom: "32px", 
  },

  tabRow: {
    display: "flex",
    background: "#f3f4f6",
    borderRadius: "8px",
    padding: "3px",
    marginBottom: "28px",
  },

  tab: (active) => ({
    flex: 1,
    padding: "8px 0",
    fontSize: "14px",
    fontWeight: active ? 600 : 400,
    color: active ? "#111827" : "#6b7280",
    background: active ? "#fff" : "transparent",
    border: active ? "0.5px solid #d4dbe6" : "none",
    borderRadius: "6px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all .18s ease",
    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
    outline: "none",
  }),

  fieldLabel: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.07em",
    color: "#6b7280",
    marginBottom: "6px",
    textTransform: "uppercase",
  },

  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.07em",
    cursor: "pointer",
    transition: "background .15s",
    marginTop: "4px",
    "&:hover": { background: "#1d4ed8" },
    "&:active": { background: "#1e40af" },
    "&:disabled": { background: "#93c5fd", cursor: "not-allowed" },
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "20px 0",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.07em",
    color: "#9ca3af",
    textTransform: "uppercase",

    "&::before, &::after": {
      content: '""',
      flex: 1,
      height: "0.5px",
      background: "#e5e7eb",
    },
  },

  socialsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  socialBtn: {
    width: 44,
    height: 44,
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    cursor: "pointer",
    transition: "border-color .15s, background .15s",
    padding: 0,
    "&:hover": {
      borderColor: "#d1d5db",
      background: "#f9fafb",
    },
  },

  rowSplit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "6px",
  },

  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#4b5563",
    cursor: "pointer",
    userSelect: "none",
  },

  forgotLink: {
    fontSize: "13px",
    color: "#2563eb",
    fontWeight: 500,
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },

  termsRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    marginBottom: "16px",
    fontSize: "12px",
    color: "#4b5563",
    lineHeight: 1.5,
  },

  termsLink: {
    color: "#2563eb",
    fontWeight: 500,
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },

  errorText: {
    fontSize: "11px",
    color: "#dc2626",
    marginTop: "4px",
  },
};

export const inputStyles = {
  mb: "16px",

  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    background: "#fff",
    fontSize: "14px",
    transition: "box-shadow 0.15s ease",

    "& fieldset": {
      borderColor: "#d1d5db",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "#9ca3af",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563eb",
      borderWidth: "1.5px",
    },
    "&.Mui-focused": {
      boxShadow: "0 0 0 3px rgba(37,99,235,0.1)",
    },
    "&.Mui-error fieldset": {
      borderColor: "#dc2626",
    },
    "&.Mui-error": {
      boxShadow: "0 0 0 3px rgba(220,38,38,0.08)",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#9ca3af",
    fontSize: "14px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2563eb",
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#dc2626",
  },
};

export const btnSx = {
  width: 48,
  height: 48,
  minWidth: "auto", 
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: 0,
  background: "#fff",
  transition: "border-color .15s, background .15s, transform .15s", 
  "&:hover": {
    background: "#f9fafb",
    borderColor: "#d1d5db",
    transform: "scale(1.1)", 
  },
};

export const iconSx = {
  google: {
    width: "22px", 
    height: "22px",
    display: "flex",
  },
  imageIcon: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },
  fb:  { color: "#1877F2", fontSize: "24px" },
  x:   { color: "#000000", fontSize: "20px" }, 
  git: { color: "#1f2328", fontSize: "24px" },
};