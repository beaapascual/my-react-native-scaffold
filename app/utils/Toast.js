import Toast from 'react-native-root-toast';

/**
 * Show toast
 * @param {String} message
 * @param {String} duration
 */
export function ShowToast(message, duration) {
    Toast.show(message, {
        duration: Toast.durations[duration],
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
}
