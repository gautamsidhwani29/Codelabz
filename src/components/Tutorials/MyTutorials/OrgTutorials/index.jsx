import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import _ from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BaseTutorialsComponent from "../BaseTutorialsComponent";

const OrgTabPanel = ({ orgList, user }) => {
  const [listData, setListData] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const data = [
      { name: user.displayName, image: user.photoURL, handle: user.userHandle },
      ...orgList.map(org => ({
        name: org.org_name,
        image: org.org_image,
        handle: org.org_handle
      }))
    ];
    setListData(data);
    setSelected(data[0]);
  }, [orgList]);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (item) => {
    setSelected(item);
    handleClose();
  };

  if (!selected) return null;

  return (
    <Box>
      {/* Section header with workspace switcher */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
          Recent Tutorials
        </Typography>

        {/* Workspace dropdown chip */}
        <Box
          onClick={handleOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: "50px",
            border: "1px solid #e2e8f0",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            cursor: "pointer",
            userSelect: "none",
            transition: "all 0.15s",
            "&:hover": {
              borderColor: "#2563EB",
              boxShadow: "0 2px 8px rgba(37,99,235,0.12)",
            },
          }}
        >
          <Avatar
            src={selected.image}
            alt={selected.name}
            sx={{ width: 24, height: 24, fontSize: "0.6rem" }}
          />
          <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e293b" }}>
            {selected.name || selected.handle}
          </Typography>
          <KeyboardArrowDownIcon
            sx={{
              fontSize: "1rem",
              color: "#64748b",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </Box>

        {/* Dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              mt: 0.5,
              minWidth: 200,
            }
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {listData.map((item, i) => (
            <MenuItem
              key={i}
              onClick={() => handleSelect(item)}
              selected={selected.handle === item.handle}
              sx={{
                gap: 1.5,
                borderRadius: "8px",
                mx: 0.5,
                my: 0.25,
                fontSize: "0.85rem",
                fontWeight: selected.handle === item.handle ? 700 : 400,
                color: selected.handle === item.handle ? "#2563EB" : "#1e293b",
                "&.Mui-selected": {
                  backgroundColor: "#eff6ff",
                },
                "&:hover": {
                  backgroundColor: "#f8fafc",
                },
              }}
            >
              <Avatar
                src={item.image}
                alt={item.name}
                sx={{ width: 28, height: 28, fontSize: "0.65rem" }}
              />
              {item.name || item.handle}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Tutorial cards */}
      <BaseTutorialsComponent owner={selected.handle} />
    </Box>
  );
};

const OrgTutorialsComponent = ({ organizations, user }) => {
  const org = useSelector(({ tutorials: { data: { org } } }) => org);
  const [orgData, setOrgData] = React.useState([]);

  useEffect(() => {
    if (org.length > 0) {
      const org_list = organizations.map(o => o.org_handle);
      const orgs_with_tutorials_count = org_list.map(org_handle => ({
        org_handle,
        tutorials_count: org.filter(e => e.owner === org_handle).length
      }));
      const clone_orgs = _.clone(organizations);
      const merged_orgs = _.merge(clone_orgs, orgs_with_tutorials_count);
      const updated_orgs = _.reverse(_.sortBy(merged_orgs, ["tutorials_count"]));
      setOrgData(updated_orgs);
    }
  }, [organizations, org]);

  return <OrgTabPanel orgList={orgData} user={user} />;
};

export default OrgTutorialsComponent;