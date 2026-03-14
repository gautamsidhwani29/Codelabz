import React, { useEffect, useState } from "react";
import { Card, Box, Grid, Typography, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HtmlTextRenderer from "../../Tutorials/subComps/HtmlTextRenderer";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import DescriptionIcon from "@mui/icons-material/Description";

const useStyles = makeStyles(() => ({
  container: {
    padding: "5px 24px",
    margin: "24px 0"
  }
}));

// Renders a single media item based on its type
const MediaItem = ({ media }) => {
  if (media.type === "image") {
    return (
      <Box sx={{ my: 2 }}>
        <img
          src={media.url}
          alt={media.name}
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        />
      </Box>
    );
  }

  if (media.type === "video") {
    return (
      <Box sx={{ my: 2 }}>
        <video
          controls
          style={{ maxWidth: "100%", borderRadius: "8px" }}
          poster={media.thumbnail || undefined}
        >
          <source src={media.url} />
          Your browser does not support the video tag.
        </video>
      </Box>
    );
  }

  if (media.type === "document") {
    return (
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1.5,
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          width: "fit-content"
        }}
      >
        <DescriptionIcon color="action" />
        <Typography
          component="a"
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          sx={{ color: "#2563EB", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          {media.name}
        </Typography>
        <Chip label="document" size="small" variant="outlined" />
      </Box>
    );
  }

  return null;
};

const Tutorial = ({ steps, tutorialMedia = [] }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.container}>
        {steps?.map((step, i) => {
          return (
            <Box id={step.id} key={step.id} data-testId="tutorialpageSteps">
              <Typography sx={{ fontWeight: "600" }}>
                {i + 1 + ". " + step.title}
              </Typography>
              <Typography className="content">
                <HtmlTextRenderer html={step.content} />
              </Typography>
            </Box>
          );
        })}

        {/* ── Media Section ── */}
        {tutorialMedia.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Attachments
            </Typography>
            {tutorialMedia.map((media, index) => (
              <MediaItem key={index} media={media} />
            ))}
          </Box>
        )}
      </Card>
    </>
  );
};

export default Tutorial;