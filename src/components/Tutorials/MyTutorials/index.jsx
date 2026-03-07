import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import {
  clearTutorialsBasicData,
  getOrgTutorialsBasicData,
  getUserTutorialsBasicData
} from "../../../store/actions";
import OrgTutorialsComponent from "./OrgTutorials";
import Header from "./Search";

const MyTutorials = () => {
  const [org_handles, setOrgHandles] = useState([]);
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const userHandle = useSelector(({ firebase: { profile: { handle } } }) => handle);
  const displayName = useSelector(({ firebase: { profile: { displayName } } }) => displayName);
  const photoURL = useSelector(({ firebase: { profile: { photoURL } } }) => photoURL);
  const organizations = useSelector(({ profile: { data: { organizations } } }) => organizations);

  useEffect(() => {
    setOrgHandles(
      organizations && organizations.length > 0
        ? organizations.map(org => org.org_handle)
        : []
    );
  }, [organizations]);

  useEffect(() => {
    getUserTutorialsBasicData(userHandle)(firestore, dispatch);
  }, [userHandle, firestore, dispatch]);

  useEffect(() => {
    if (org_handles.length > 0)
      getOrgTutorialsBasicData(org_handles)(firestore, dispatch);
  }, [org_handles, firestore, dispatch]);

  useEffect(() => () => clearTutorialsBasicData()(dispatch), [dispatch]);

  const userDetails = { userHandle, displayName, photoURL };

  return (
    <Box
      data-testid="tutorialMainBody"
      sx={{
        minHeight: "100vh",
        background: "#f1f5f9",
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Header />

      {organizations && organizations.length > 0 && (
        <OrgTutorialsComponent
          organizations={organizations}
          user={userDetails}
        />
      )}
    </Box>
  );
};

export default MyTutorials;