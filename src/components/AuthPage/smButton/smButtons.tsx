import { Grid, IconButton, Icon } from "@mui/material";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import type { Dispatch } from "redux";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signInWithGoogle, signInWithProviderID } from "../../../store/actions";
import { btnSx, iconSx } from "../styles";

const SmButtons = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch>();
  const firebase = useFirebase();

  return (
    <Grid
      container
      data-testid="smButtons"
      style={{
        marginTop: "0.4rem",
        justifyContent: "center"
      }}
    >
      <Grid item>
        <IconButton
          sx={btnSx}
          onClick={() => signInWithGoogle()(firebase, dispatch)}
        >
          <Icon sx={iconSx.google}>
            <img
              style={iconSx.imageIcon as React.CSSProperties}
              src={GoogleImg}
              alt="google"
            />
          </Icon>
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          sx={btnSx}
          onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
        >
          <FacebookIcon sx={iconSx.fb} />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          sx={btnSx}
          onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
        >
          <XIcon sx={iconSx.x} />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          sx={btnSx}
          onClick={() => signInWithProviderID("github")(firebase, dispatch)}
        >
          <GitHubIcon sx={iconSx.git} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SmButtons;
