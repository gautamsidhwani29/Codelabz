import { Grid, IconButton, Icon } from "@mui/material";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signInWithGoogle, signInWithProviderID } from "../../../store/actions";
import { btnSx, iconSx } from "../styles";

const SmButtons = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();

  return (
    <Grid
      container
      data-testid="smButtons"
      justifyContent="center"
      spacing={1}
    >
      <Grid item>
        <IconButton
          sx={btnSx}
          onClick={() => signInWithGoogle()(firebase, dispatch)}
          title="Continue with Google"
        >
          <Icon sx={iconSx.google}>
            <img style={iconSx.imageIcon} src={GoogleImg} alt="Google" />
          </Icon>
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          sx={btnSx}
          onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
          title="Continue with Facebook"
        >
          <FacebookIcon sx={iconSx.fb} />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          sx={btnSx}
          onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
          title="Continue with X"
        >
          <XIcon sx={iconSx.x} />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          sx={btnSx}
          onClick={() => signInWithProviderID("github")(firebase, dispatch)}
          title="Continue with GitHub"
        >
          <GitHubIcon sx={iconSx.git} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SmButtons;