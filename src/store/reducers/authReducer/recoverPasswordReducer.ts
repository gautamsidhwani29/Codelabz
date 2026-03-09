import * as actions from "../../actions/actionTypes";
import { AuthActionType } from "../../actions/actionTypes";

interface RecoverPasswordState {
  loading: boolean;
  error: string | false | null;
  resetError: string | false | null;
  resetLoading: boolean;
  user: string | null;
}

interface AuthAction {
  type: AuthActionType;
  payload?: unknown;
}

const initialState: RecoverPasswordState = {
  loading: false,
  error: null,
  resetError: null,
  resetLoading: false,
  user: null
};

const RecoverPasswordReducer = (
  state: RecoverPasswordState = initialState,
  { type, payload }: AuthAction
): RecoverPasswordState => {
  switch (type) {
    case actions.CLEAR_AUTH_RECOVER_PASSWORD_STATE:
      return initialState;

    case actions.RESEND_VERIFY_EMAIL_START:
    case actions.VERIFY_RESET_CODE_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.RESEND_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };

    case actions.VERIFY_RESET_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: payload as string
      };

    case actions.RESEND_VERIFY_EMAIL_FAIL:
    case actions.VERIFY_RESET_CODE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload as string
      };

    case actions.PASSWORD_RECOVERY_START:
      return {
        ...state,
        loading: false,
        resetError: null
      };

    case actions.PASSWORD_RECOVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        resetError: false
      };

    case actions.PASSWORD_RECOVERY_FAIL:
      return {
        ...state,
        loading: false,
        resetError: payload as string
      };

    default:
      return state;
  }
};

export default RecoverPasswordReducer;