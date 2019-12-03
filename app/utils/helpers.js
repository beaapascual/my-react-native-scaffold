import { AsyncStorage } from 'react-native';
import moment from 'moment';

const LOGIN_TOKEN_STORAGE_KEY = 'AppLoginToken';

/**
 * Save login token
 * @param {String} loginToken
 */
export async function saveLoginToken(loginToken) {
    await AsyncStorage.setItem(LOGIN_TOKEN_STORAGE_KEY, loginToken);
}

/**
 * Retrieve login token
 * @returns {String}
 */
export async function getLoginToken() {
    const token = await AsyncStorage.getItem(LOGIN_TOKEN_STORAGE_KEY);

    return token;
}

/**
 * Delete login token
 */
export async function deleteLoginToken() {
    await AsyncStorage.removeItem(LOGIN_TOKEN_STORAGE_KEY);
}

/**
 * Validate email address
 * @param {String} email
 * @returns {Boolean}
 */
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
}

/**
 * Check if registered user has filled up all necessary profile info
 * @param {Object} user
 * @returns {Boolean}
 */
export function isOldUser(user) {
    return user.name;
}

/**
 * Formats date to string
 * @param {String} date
 * @returns {String}
 */
export function formatDateToString(date) {
    if (!date) {
        return;
    }

    const time = date.split(' ');
    const yesterday = moment(
        moment()
            .subtract(1, 'days')
            .startOf('day'),
    ).format('YYYY-MM-DD');

    if (moment(time[0]).isSame(moment(), 'day')) {
        return moment(time[1], ['h:mm:ss']).format('hh:mm a');
    }
    else if (moment(time[0]).isSame(yesterday, 'day')) {
        return 'yesterday';
    }
    else {
        return moment(time[0]).format('MM/DD/YY');
    }
}

/**
 * Formats date to time string
 * @param {String} date
 * @returns {String}
 */
export function formatDateToTimeString(date) {
    const dateFormatted = moment.utc(date);

    if (moment().diff(dateFormatted, 'minute') <= 60) {
        const minute = moment().diff(dateFormatted, 'minute');

        return `${minute}m ago`;
    }
    else if (moment().diff(dateFormatted, 'hour') <= 5) {
        const hour = moment().diff(dateFormatted, 'hour');

        return `${hour}h ago`;
    }
    else {
        return moment(dateFormatted).calendar();
    }
}

/**
 * Get image url from chat message text
 * @param {String} text
 * @returns {String}
 */
export function getImageUrlFromText(text) {
    const result = text.match(
        /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/gi,
    );

    return result ? result[0] : null;
}
