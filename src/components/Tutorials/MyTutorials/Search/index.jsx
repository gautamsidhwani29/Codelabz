import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { searchFromTutorialsIndex } from "../../../../store/actions";
import NewTutorial from "../../NewTutorial";
import SearchResultsComponent from "./SearchResultsComponent";

const Header = () => {
  const [results, setResults] = useState([]);
  const [viewResults, setViewResults] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const displayName = useSelector(({ firebase: { profile: { displayName } } }) => displayName);

  const handleOnSearch = ({ target: { value } }) => {
    if (value === "") return setViewResults(false);
    const result = searchFromTutorialsIndex(value);
    if (result.length === 0) { setViewResults(true); return setResults([]); }
    let tempArray = [];
    result.forEach(item => { tempArray = [...tempArray, item.ref]; });
    setViewResults(true);
    return setResults(tempArray);
  };

  const closeModal = () => setVisibleModal(prev => !prev);
  const firstName = displayName ? displayName.split(" ")[0] : "Developer";

  return (
    <Box>
      {/* Hero greeting */}
      <Box sx={{ mb: 3 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.75rem", md: "2.1rem" },
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          Welcome back, {firstName}!
        </Typography>
        <Typography sx={{ fontSize: "0.95rem", color: "#64748b" }}>
          Continue your journey or start something entirely new today.
        </Typography>
      </Box>

      {/* Search bar + button row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        {/* Search */}
        <Box
          sx={{
            flex: 1,
            background: "#fff",
            borderRadius: "50px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            px: 2.5,
            py: "6px",
            display: "flex",
            alignItems: "center",
            gap: 1,
            transition: "border-color 0.2s",
            "&:focus-within": {
              borderColor: "#2563EB",
              boxShadow: "0 0 0 3px rgba(37,99,235,0.1)",
            },
          }}
        >
          <SearchIcon sx={{ color: "#94a3b8", fontSize: "1.2rem", flexShrink: 0 }} />
          <TextField
            placeholder="Search tutorials, languages, or frameworks..."
            onKeyUp={handleOnSearch}
            variant="standard"
            fullWidth
            data-testid="tutorialSearch"
            InputProps={{ disableUnderline: true }}
            sx={{
              "& input": {
                fontSize: "0.92rem",
                color: "#1e293b",
                py: 0.75,
                "&::placeholder": { color: "#94a3b8" },
              },
            }}
          />
        </Box>

        {/* Create button */}
        <Button
          variant="contained"
          onClick={() => setVisibleModal(true)}
          startIcon={<Add />}
          data-testid="NewTutorialBtn"
          sx={{
            borderRadius: "50px",
            px: 3,
            py: 1.25,
            boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
            color: "white",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.92rem",
            whiteSpace: "nowrap",
            flexShrink: 0,
            "&:hover": { boxShadow: "0 6px 20px rgba(37,99,235,0.4)" },
          }}
        >
          Create New Tutorial
        </Button>
      </Box>

      <NewTutorial viewModal={visibleModal} onSidebarClick={e => closeModal(e)} />

      {viewResults && (
        <Box sx={{ mb: 3 }}>
          <SearchResultsComponent results={results} />
        </Box>
      )}
    </Box>
  );
};

export default Header;