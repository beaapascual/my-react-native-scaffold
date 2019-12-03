const SHOW_FLASH_NOTIFICATION = 'SHOW_FLASH_NOTIFICATION';
const HIDE_FLASH_NOTIFICATION = 'HIDE_FLASH_NOTIFICATION';

export function showFlashNotification({
    text,
    permanent = false,
    location = 'top',
    isWarning = false,
}) {
    return {
        type: SHOW_FLASH_NOTIFICATION,
        text,
        permanent,
        location,
        isWarning,
    };
}

export function hideFlashNotification() {
    return {
        type: HIDE_FLASH_NOTIFICATION,
    };
}

const initialState = {
    showFlashNotification: false,
    text: '',
    location: 'top',
    permanent: false,
    isWarning: false,
};

export default function flashNotification(state = initialState, action) {
    switch (action.type) {
        case SHOW_FLASH_NOTIFICATION:
            return {
                showFlashNotification: true,
                text: action.text,
                location: action.location,
                permanent: action.permanent,
                isWarning: action.isWarning,
            };

        case HIDE_FLASH_NOTIFICATION:
            return initialState;

        default:
            return state;
    }
}
