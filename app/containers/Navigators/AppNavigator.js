/* eslint-disable no-prototype-builtins */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import {
    createAppContainer,
    StackActions,
    NavigationActions,
} from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import LoginContainer from '../Auth/LoginContainer';
import RegisterContainer from '../Auth/RegisterContainer';
import InnerStackNavigator from '../Navigators/InnerStackNavigator';
// import AppEventEmitter, { AppEvent } from '~/utils/AppEvents';
import { isOldUser } from '~/utils/helpers';

const appNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginContainer,
            navigationOptions: { header: null },
        },
        Register: {
            screen: RegisterContainer,
            navigationOptions: { header: null },
        },
        MainScreen: {
            screen: InnerStackNavigator,
            navigationOptions: { header: null },
        },
    },
    {
        // initialRouteName: this.getInitialRoute(),
        cardStyle: {
            backgroundColor: 'gray',
        },
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                // Disable the transition animation when resetting to the main screen
                if (sceneProps.index === 0 && sceneProps.scenes.length > 2) {
                    return null;
                }

                // Otherwise, use the usual animation
                return Platform.OS === 'ios'
                    ? StackViewStyleInterpolator.forHorizontal(sceneProps)
                    : StackViewStyleInterpolator.forFadeFromBottomAndroid(
                        sceneProps,
                    );
            },
        }),
    },
);

const NavContainer = createAppContainer(appNavigator);

class AppNavigator extends PureComponent {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
        profileData: PropTypes.object.isRequired,
        onboardingData: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (
            this.props.isAuthed &&
            this.props.profileData.hasOwnProperty('id')
        ) {
            if (!isOldUser(this.props.profileData)) {
                // if with onboarding
            }
            else {
                const resetAction = StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                        NavigationActions.navigate({ routeName: 'MainScreen' }),
                    ],
                });

                this.navigatorRef.dispatch(resetAction);
            }
        }
    }

    render() {
        return (
            <NavContainer
                ref={nav => {
                    this.navigatorRef = nav;
                }}
                screenProps={{ ...this.props }}/>
        );
    }
}

function mapStateToProps({ authentication }) {
    return {
        isAuthed: authentication.isAuthed,
        profileData: authentication.profileData,
    };
}

export default connect(mapStateToProps)(AppNavigator);
