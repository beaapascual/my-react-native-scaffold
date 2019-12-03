import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationEvents } from 'react-navigation';
import { WebImage } from '~/components';
import { pageContainer, scrollContainer, windowSpacing, avatar } from '~/styles';

export default class Home extends PureComponent {
    static propTypes = {
        isRefreshing: PropTypes.bool,
        onRefresh: PropTypes.func.isRequired,
        onLoad: PropTypes.func.isRequired,
        profileData: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <KeyboardAwareScrollView
                style={styles.pageContainer}
                contentContainerStyle={styles.content}
                enableOnAndroid={true}
                extraHeight={120}
                keyboardShouldPersistTaps='handled'>
                <Text>Home</Text>
                <NavigationEvents onDidFocus={this.props.onLoad} />
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer,
    avatar,
    content: {
        ...scrollContainer,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: windowSpacing,
        paddingHorizontal: windowSpacing,
    },
});
