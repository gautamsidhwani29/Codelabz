import * as actions from "../../actions/actionTypes";
import { AuthActionType } from "../../actions/actionTypes";

interface VerifyEmailState {
  loading: boolean;
  error: string | false | null;
  email: string | null;
}

interface AuthAction {
  type: AuthActionType;
  payload?: unknown;
}

const initialState: VerifyEmailState = {
  loading: false,
  error: null,
  email: null
};

const VerifyEmailReducer = (
  state: VerifyEmailState = initialState,
  { type, payload }: AuthAction
): VerifyEmailState => {
  switch (type) {
    case actions.CLEAR_AUTH_VERIFY_EMAIL_STATE:
      return initialState;

    case actions.SET_VERIFY_EMAIL_FAIL:
      return {
        ...state,
        email: payload as string
      };

    case actions.RESEND_VERIFY_EMAIL_START:
    case actions.EMAIL_VERIFY_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.RESEND_VERIFY_EMAIL_SUCCESS:
    case actions.EMAIL_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };

    case actions.RESEND_VERIFY_EMAIL_FAIL:
    case actions.EMAIL_VERIFY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload as string
      };

    default:
      return state;
  }
};

export default VerifyEmailReducer;  