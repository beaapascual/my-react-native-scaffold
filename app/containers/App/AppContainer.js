import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { UIManager } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { getLoginToken } from '~/utils/helpers';
import { getAuthedUserProfile } from '~/api/users';
import { SafeAreaView } from 'react-navigation';
import { AppNavigator } from '~/containers';
import { OfflineNotice, Loader } from '~/components';
import PreSplash from './PreSplash';
import { FlashNotification } from '~/components';
import { hideFlashNotification } from '~/redux/modules/flashNotification';
import { isAuthed } from '~/redux/modules/authentication';

class AppContainer extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isAuthed: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        loaderText: PropTypes.string,
        authedUserId: PropTypes.number,
        flashNotificationIsPermanent: PropTypes.bool.isRequired,
        flashNotificationLocation: PropTypes.string.isRequired,
        flashNotificationText: PropTypes.string.isRequired,
        flashNotificationIsWarning: PropTypes.bool.isRequired,
        showFlashNotification: PropTypes.bool.isRequired,
        profileData: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.hasLocalNotificationPermission = null;
        this.deviceToken = null;
        this.EchoClient = null;
    }

    state = {
        appIsReady: false,
    };

    async componentDidMount() {
        // Enable LayoutAnimation under Android
        UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);

        this.loadAuthedData();
    }

    async loadAuthedData() {
        try {
            const loginToken = await getLoginToken();

            if (loginToken) {
                const profileData = await getAuthedUserProfile();

                this.props.dispatch(isAuthed(profileData.data));
            }
        }
        finally {
            this.setState(
                {
                    appIsReady: true,
                },
                () => {
                    SplashScreen.hide();
                },
            );
        }
    }

    handleHideFlashNotification = () => {
        this.props.dispatch(hideFlashNotification());
    };

    render() {
        if (!this.state.appIsReady) {
            return <PreSplash />;
        }

        return (
            <Fragment>
                <SafeAreaView style={{ flex: 1 }}>
                    <AppNavigator />
                    {this.props.showFlashNotification === true ? (
                        <FlashNotification
                            permanent={this.props.flashNotificationIsPermanent}
                            location={this.props.flashNotificationLocation}
                            text={this.props.flashNotificationText}
                            isWarning={this.props.flashNotificationIsWarning}
                            onHideFlashNotification={this.handleHideFlashNotification}/>
                    ) : null}
                    <OfflineNotice />
                    <Loader isLoading={this.props.isLoading} />
                </SafeAreaView>
            </Fragment>
        );
    }
}

function mapStateToProps({ authentication, indicators, flashNotification }) {
    return {
        isAuthed: authentication.isAuthed,
        authedUserId: authentication.profileData.id,
        isLoading: indicators.isLoading,
        loaderText: indicators.loaderText,
        flashNotificationIsPermanent: flashNotification.permanent,
        flashNotificationLocation: flashNotification.location,
        flashNotificationText: flashNotification.text,
        flashNotificationIsWarning: flashNotification.isWarning,
        showFlashNotification: flashNotification.showFlashNotification,
        profileData: authentication.profileData,
    };
}

export default connect(mapStateToProps)(AppContainer);
