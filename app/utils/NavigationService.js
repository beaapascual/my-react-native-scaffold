import { NavigationActions } from 'react-navigation';

let _navigator;

/**
 * Sets the ref object
 * @param {Object} navigatorRef
 * @returns {void}
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

/**
 * Sets the navigation path and custom parameters
 * @param {String} routeName
 * @param {Object} params
 * @returns {void}
 */
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
}

export default {
    navigate,
    setTopLevelNavigator,
};
