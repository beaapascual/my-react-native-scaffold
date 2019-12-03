// import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
import { Text, Dimensions, StyleSheet, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

class OfflineNotice extends PureComponent {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {
            isConnected: true,
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleConnectivityChange,
        );

        NetInfo.isConnected.fetch().done(isConnected => {
            if (isConnected == true) {
                this.setState({ isConnected: true });
            }
            else {
                this.setState({ isConnected: false });
            }
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this.handleConnectivityChange,
        );
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        }
        else {
            this.setState({ isConnected });
        }
    };

    render() {
        if (!this.state.isConnected) {
            return (
                <SafeAreaView style={styles.offlineContainer}>
                    <StatusBar
                        backgroundColor={'#b52424'}
                        barStyle={'light-content'}/>
                    <Text style={styles.offlineText}>
                        No Internet Connection
                    </Text>
                </SafeAreaView>
            );
        }

        return null;
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 0,
    },
    offlineText: { color: '#fff' },
});

export default OfflineNotice;
