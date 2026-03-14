import React, { useEffect, useRef, useState } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createTutorial, getProfileData } from "../../../store/actions";
import { uploadTutorialMedia } from "../../../store/actions/tutorialsActions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Alert, Box, Chip, CircularProgress, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";
import { Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import MovieIcon from "@mui/icons-material/Movie";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "react-select";
import { common } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    paddingTop: "8px",
    paddingBottom: "10px"
  },
  item: {
    margin: "10px"
  },
  purple: {
    color: deepPurple[700],
    backgroundColor: deepPurple[500]
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  button: {
    marginLeft: theme.spacing(1),
    padding: "0.4rem 0.4rem"
  }
}));

const NewTutorial = ({
  viewModal,
  onSidebarClick,
  viewCallback,
  active,
  profile
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [formValue, setformValue] = useState({
    title: "",
    summary: "",
    owner: "",
    tags: []
  });

  // Media state
  const [mediaFiles, setMediaFiles] = useState([]); // { file, type, preview }
  const [mediaUploading, setMediaUploading] = useState(false);

  // Hidden file input refs for each media type
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const docInputRef = useRef(null);

  const loadingProp = useSelector(
    ({
      tutorials: {
        create: { loading }
      }
    }) => loading
  );
  const errorProp = useSelector(
    ({
      tutorials: {
        create: { error }
      }
    }) => error
  );

  useEffect(() => {
    setLoading(loadingProp);
  }, [loadingProp]);
  useEffect(() => {
    setError(errorProp);
  }, [errorProp]);
  useEffect(() => {
    setformValue(prev => ({ ...prev, tags }));
  }, [tags]);

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  useEffect(() => {
    if (!organizations) {
      getProfileData()(firebase, firestore, dispatch);
    }
  }, [firestore, firebase, dispatch, organizations]);

  const userHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );

  useEffect(() => {
    setTags([]);
    setNewTag("");
    setMediaFiles([]);
    setformValue({ title: "", summary: "", owner: "", tags: [] });
    setVisible(viewModal);
  }, [viewModal]);

  // Handle file selection for any media type
  const handleFileSelect = (e, mediaType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL for images
    const preview = mediaType === "image" ? URL.createObjectURL(file) : null;

    setMediaFiles(prev => [
      ...prev,
      { file, type: mediaType, preview, name: file.name }
    ]);

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  // Remove a media file before submitting
  const handleRemoveMedia = index => {
    setMediaFiles(prev => {
      const updated = [...prev];
      // Revoke preview URL to free memory
      if (updated[index].preview) URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const onSubmit = async formData => {
    formData.preventDefault();
    const userHandle = profile?.handle || "";
    const tutorialData = {
      ...formValue,
      created_by: userHandle,
      is_org: userHandle !== formValue.owner,
      completed: false
    };

    const tutorial_id = await createTutorial(tutorialData)(
      firebase,
      firestore,
      dispatch,
      history
    );

    if (tutorial_id && mediaFiles.length > 0) {
      setMediaUploading(true);
      for (const media of mediaFiles) {
        await uploadTutorialMedia(
          formValue.owner,
          tutorial_id,
          media.file,
          media.type
        )(firebase, firestore, dispatch);
      }
      setMediaUploading(false);
    }
  };

  const onOwnerChange = value => {
    setformValue(prev => ({ ...prev, owner: value }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setformValue(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleDeleteTag = tagToDelete => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const classes = useStyles();

  return (
    <Modal
      open={visible}
      onClose={onSidebarClick}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        data-testId="tutorialNewModal"
        style={{
          height: "auto",
          width: "auto",
          background: "white",
          padding: "2rem",
          paddingTop: "1rem",
          maxWidth: "40%"
        }}
      >
        {error && (
          <Alert message={""} type="error" closable="true" className="mb-24">
            description={"Tutorial Creation Failed"}
          </Alert>
        )}

        <Typography variant="h5">Create a Tutorial</Typography>

        <Box sx={{ py: 2, width: "50%" }}>
          <Typography>
            <Select
              options={organizations?.map(org => ({
                value: org.org_handle,
                label: org.org_name
              }))}
              onChange={data => {
                onOwnerChange(data.value);
              }}
              id="orgSelect"
            />
          </Typography>
        </Box>

        <form id="tutorialNewForm">
          <TextField
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Title of the Tutorial"
            autoComplete="title"
            name="title"
            variant="outlined"
            fullWidth
            data-testId="newTutorial_title"
            id="newTutorialTitle"
            style={{ marginBottom: "2rem" }}
            onChange={e => handleChange(e)}
          />

          <TextField
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            fullWidth
            variant="outlined"
            name="summary"
            placeholder="Summary of the Tutorial"
            autoComplete="summary"
            id="newTutorialSummary"
            data-testId="newTutorial_summary"
            onChange={e => handleChange(e)}
            style={{ marginBottom: "2rem" }}
          />

          <TextField
            label="Enter a tag"
            variant="outlined"
            size="small"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleAddTag}
          >
            Add Tag
          </Button>

          <div className={classes.tagsContainer}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                className={classes.chip}
                deleteIcon={<CloseIcon />}
              />
            ))}
          </div>

          {/* ── Media Upload Buttons ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Attach media:
            </Typography>

            {/* Image upload */}
            <Tooltip title="Upload Image">
              <IconButton onClick={() => imageInputRef.current.click()}>
                <ImageIcon color="primary" />
              </IconButton>
            </Tooltip>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={e => handleFileSelect(e, "image")}
            />

            {/* Video upload */}
            <Tooltip title="Upload Video">
              <IconButton onClick={() => videoInputRef.current.click()}>
                <MovieIcon color="secondary" />
              </IconButton>
            </Tooltip>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              hidden
              onChange={e => handleFileSelect(e, "video")}
            />

            {/* Document upload */}
            <Tooltip title="Upload Document">
              <IconButton onClick={() => docInputRef.current.click()}>
                <DescriptionIcon color="action" />
              </IconButton>
            </Tooltip>
            <input
              ref={docInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              hidden
              onChange={e => handleFileSelect(e, "document")}
            />
          </Box>

          {/* ── Media Preview ── */}
          {mediaFiles.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Attached files:
              </Typography>
              {mediaFiles.map((media, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                    p: 1,
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px"
                  }}
                >
                  {/* Image preview thumbnail */}
                  {media.type === "image" && media.preview && (
                    <img
                      src={media.preview}
                      alt={media.name}
                      style={{
                        width: 48,
                        height: 48,
                        objectFit: "cover",
                        borderRadius: 4
                      }}
                    />
                  )}

                  {/* Video icon */}
                  {media.type === "video" && <MovieIcon color="secondary" />}

                  {/* Document icon */}
                  {media.type === "document" && (
                    <DescriptionIcon color="action" />
                  )}

                  <Typography variant="body2" sx={{ flex: 1 }} noWrap>
                    {media.name}
                  </Typography>

                  <Chip
                    label={media.type}
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "capitalize" }}
                  />

                  <IconButton
                    size="small"
                    onClick={() => handleRemoveMedia(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}

          <div className="mb-0">
            <div style={{ float: "right" }}>
              <Button
                key="back"
                onClick={() => {
                  onSidebarClick();
                  setTags([]);
                  setNewTag("");
                  setMediaFiles([]);
                  setformValue({ title: "", summary: "", owner: "", tags: [] });
                }}
                id="cancelAddTutorial"
              >
                Cancel
              </Button>
              <Button
                key="submit"
                type="primary"
                variant="contained"
                color="secondary"
                htmlType="submit"
                loading={loading}
                onClick={e => onSubmit(e)}
                data-testid="newTutorialSubmit"
                sx={{
                  bgcolor: "#03AAFA",
                  borderRadius: "30px",
                  color: common.white,
                  "&:hover": { bgcolor: "#03AAFA" }
                }}
                disabled={
                  formValue.title === "" ||
                  formValue.summary === "" ||
                  formValue.owner === "" ||
                  mediaUploading
                }
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewTutorial;
