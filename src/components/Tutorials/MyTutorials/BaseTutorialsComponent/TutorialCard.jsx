import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import TutorialImg from "../../../../assets/images/tutorialCard.png";
import React from "react";
import { Link } from "react-router-dom";

const TutorialCard = ({
  tutorialData: { tutorial_id, title, summary, icon, owner },
  loading
}) => {
  return (
    <Link
      to={`/tutorials/${owner}/${tutorial_id}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <Card
        data-testid="tutorialCard"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
          cursor: "pointer",
          overflow: "hidden",
          background: "#fff",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 8px 24px rgba(37,99,235,0.12)",
            borderColor: "#93c5fd"
          }
        }}
      >
        <CardMedia
          component="img"
          alt={title}
          height="160"
          image={icon ? icon : TutorialImg}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            p: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 0.75
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#111827",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#6b7280",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flex: 1
            }}
          >
            {summary}
          </Typography>
          <Chip
            label={`@${owner}`}
            size="small"
            sx={{
              alignSelf: "flex-start",
              fontSize: "0.7rem",
              height: "20px",
              backgroundColor: "#eff6ff",
              color: "#2563EB",
              fontWeight: 600,
              border: "1px solid #bfdbfe"
            }}
          />
        </Box>
      </Card>
    </Link>
  );
};

export default TutorialCard;
