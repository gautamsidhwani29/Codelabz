import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTutorial, getProfileData } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  Alert,
  Box,
  Chip,
  LinearProgress,
  Tooltip,
  Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import MovieIcon from "@mui/icons-material/Movie";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "react-select";
import { common } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles(theme => ({
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

  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const docInputRef = useRef(null);

  const loadingProp = useSelector(
    ({ tutorials: { create: { loading } } }) => loading
  );
  const errorProp = useSelector(
    ({ tutorials: { create: { error } } }) => error
  );

  useEffect(() => { setLoading(loadingProp); }, [loadingProp]);
  useEffect(() => { setError(errorProp); }, [errorProp]);
  useEffect(() => {
    setformValue(prev => ({ ...prev, tags }));
  }, [tags]);

  const organizations = useSelector(
    ({ profile: { data: { organizations } } }) => organizations
  );

  useEffect(() => {
    if (!organizations) {
      getProfileData()(firebase, firestore, dispatch);
    }
  }, [firestore, firebase, dispatch, organizations]);

  const revokeAllPreviews = (files) => {
    files.forEach(m => m.preview && URL.revokeObjectURL(m.preview));
  };

  const resetForm = () => {
    setTags([]);
    setNewTag("");
    setMediaFiles([]);
    setUploadProgress({});
    setformValue({ title: "", summary: "", owner: "", tags: [] });
  };

  useEffect(() => {
    resetForm();
    setVisible(viewModal);
  }, [viewModal]);

  const handleFileSelect = (e, mediaType) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = mediaType === "image" ? URL.createObjectURL(file) : null;
    setMediaFiles(prev => [
      ...prev,
      { file, type: mediaType, preview, name: file.name }
    ]);
    e.target.value = "";
  };

  const handleRemoveMedia = index => {
    setMediaFiles(prev => {
      const updated = [...prev];
      if (updated[index].preview) URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const uploadWithProgress = (owner, tutorial_id, file, mediaType, index) => {
    return new Promise((resolve, reject) => {
      const storagePath = `tutorials/${owner}/${tutorial_id}/media/${mediaType}/${file.name}`;
      const storageRef = firebase.storage().ref().child(storagePath);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(prev => ({ ...prev, [index]: progress }));
        },
        error => {
          reject(error);
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          const mediaDoc = {
            name: file.name,
            type: mediaType,
            url: downloadURL,
            thumbnail: mediaType === "image" ? downloadURL : null,
            size: file.size,
            uploadedAt: firestore.FieldValue.serverTimestamp()
          };
          await firestore
            .collection("tutorials")
            .doc(tutorial_id)
            .collection("media")
            .add(mediaDoc);
          setUploadProgress(prev => ({ ...prev, [index]: 100 }));
          resolve(downloadURL);
        }
      );
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
      dispatch
    );

    if (tutorial_id && mediaFiles.length > 0) {
      setMediaUploading(true);
      for (let i = 0; i < mediaFiles.length; i++) {
        const media = mediaFiles[i];
        await uploadWithProgress(
          formValue.owner,
          tutorial_id,
          media.file,
          media.type,
          i
        );
      }
      setMediaUploading(false);
    }

    revokeAllPreviews(mediaFiles);

    if (tutorial_id) {
      history.push(`/tutorials/${formValue.owner}/${tutorial_id}`);
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
          <Alert severity="error" className="mb-24">
            Tutorial Creation Failed
          </Alert>
        )}

        <Typography variant="h5">Create a Tutorial</Typography>

        <Box sx={{ py: 2, width: "50%" }}>
          <Select
            options={organizations?.map(org => ({
              value: org.org_handle,
              label: org.org_name
            }))}
            onChange={data => { onOwnerChange(data.value); }}
            id="orgSelect"
          />
        </Box>

        <form id="tutorialNewForm">
          <TextField
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Attach media:
            </Typography>

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

          {mediaFiles.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Attached files:
              </Typography>
              {mediaFiles.map((media, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 1,
                    p: 1,
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px"
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                    {media.type === "video" && <MovieIcon color="secondary" />}
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

                    {!mediaUploading && (
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveMedia(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>

                  {mediaUploading && uploadProgress[index] !== undefined && (
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress[index]}
                        sx={{ borderRadius: 4 }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
                      >
                        {uploadProgress[index] < 100
                          ? `Uploading... ${uploadProgress[index]}%`
                          : "Upload complete"}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}

          <div className="mb-0">
            <div style={{ float: "right" }}>
              <Button
                key="back"
                onClick={() => {
                  revokeAllPreviews(mediaFiles);
                  onSidebarClick();
                  resetForm();
                }}
                id="cancelAddTutorial"
                disabled={mediaUploading}
              >
                Cancel
              </Button>
              <Button
                key="submit"
                type="primary"
                variant="contained"
                color="secondary"
                htmlType="submit"
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
                  loading ||
                  mediaUploading
                }
              >
                {loading || mediaUploading ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewTutorial;