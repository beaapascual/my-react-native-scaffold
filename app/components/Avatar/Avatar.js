import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebImage } from '~/components';
import { avatarSmall } from '~/styles';

export default class Avatar extends PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    render() {
        const { user } = this.props;

        return (
            <View>
                <WebImage
                    image={user.avatar
                        ? { uri: user.avatar }
                        : require('~/images/dummy_avatar.png')}
                    style={styles.avatarSmall}/>
                {user.is_online ? (
                    <View style={styles.onlineIndicator} />
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avatarSmall,
    onlineIndicator: {
        width: 10,
        height: 10,
        backgroundColor: '#4DDA85',
        borderRadius: 5,
        position: 'absolute',
        top: 0,
    },
});
