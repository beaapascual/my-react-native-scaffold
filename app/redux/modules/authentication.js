import { register, login } from '~/api/auth';
import { getAuthedUserProfile } from '~/api/users';
import { showFlashNotification } from './flashNotification';
import { saveLoginToken, deleteLoginToken } from '~/utils/helpers';
import AppEventEmitter, { AppEvent } from '~/utils/AppEvents';

const AUTHENTICATING = 'AUTHENTICATING';
const AUTH_FAILED = 'AUTH_FAILED';
const IS_AUTHED = 'IS_AUTHED';
const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';
export const LOGGING_OUT = 'LOGGING_OUT';

function authenticating() {
    return {
        type: AUTHENTICATING,
    };
}

function authFailed() {
    return {
        type: AUTH_FAILED,
    };
}

export function isAuthed(data) {
    return {
        type: IS_AUTHED,
        data,
    };
}

function loggingOut() {
    return {
        type: LOGGING_OUT,
    };
}

export function updateProfileData(data) {
    return {
        type: UPDATE_PROFILE_DATA,
        data,
    };
}

export function handleRegisterViaEmail(email, password) {
    return async function(dispatch) {
        dispatch(authenticating());

        try {
            const {
                data: { token },
            } = await register(email, password);

            await saveLoginToken(token);

            const { data } = await getAuthedUserProfile();

            dispatch(isAuthed(data));
        }
        catch (err) {
            let message = 'Something went wrong. Please Try again';

            if (err.response && err.response.status === 500) {
                message = 'This email is already taken';
            }

            dispatch(showFlashNotification({ text: message, isWarning: true }));
            dispatch(authFailed());
        }
    };
}

export function handleLoginViaEmail(email, password) {
    return async function(dispatch) {
        dispatch(authenticating());

        try {
            const {
                data: { token },
            } = await login(email, password);

            await saveLoginToken(token);

            const { data } = await getAuthedUserProfile();

            dispatch(isAuthed(data));
        }
        catch (err) {
            let message = 'Something went wrong. Please Try again';

            if (err.response && err.response.status !== 500) {
                message = 'Incorrect email or password';
            }

            dispatch(showFlashNotification({ text: message, isWarning: true }));
            dispatch(authFailed());
        }
    };
}

export function handleLogout() {
    return function(dispatch) {
        AppEventEmitter.emit(AppEvent.Logout);
        deleteLoginToken();
        dispatch(loggingOut());
    };
}

const initialState = {
    isAuthenticating: false,
    isAuthed: false,
    profileData: {},
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATING:
            return {
                ...state,
                isAuthenticating: true,
            };

        case AUTH_FAILED:
            return {
                ...state,
                isAuthenticating: false,
            };

        case IS_AUTHED:
            return {
                isAuthenticating: false,
                isAuthed: true,
                profileData: action.data,
            };

        case UPDATE_PROFILE_DATA:
            return {
                ...state,
                profileData: {
                    ...state.profileData,
                    ...action.data,
                },
            };

        default:
            return state;
    }
}
