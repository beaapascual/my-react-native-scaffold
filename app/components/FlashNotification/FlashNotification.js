import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Platform } from 'react-native';
import { colors } from '~/styles';

const { width } = Dimensions.get('window');
const NOTIFICATION_WIDTH = width * 0.7;

export default class FlashNotification extends Component {
    static propTypes = {
        duration: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        permanent: PropTypes.bool.isRequired,
        isWarning: PropTypes.bool.isRequired,
        onHideFlashNotification: PropTypes.func.isRequired,
    };

    static defaultProps = {
        duration: 5000,
        location: 'top',
        permanent: false,
        isWarning: false,
    };

    state = {
        scaleX: new Animated.Value(0.2),
        opacity: new Animated.Value(0.9),
        textOpacity: new Animated.Value(0),
    };

    componentDidMount() {
        Animated.spring(this.state.scaleX, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        Animated.timing(this.state.textOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: Platform.OS === 'android',
        }).start();

        if (this.props.permanent === false) {
            setTimeout(() => {
                Animated.timing(this.state.opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(this.props.onHideFlashNotification);
            }, this.props.duration);
        }
    }

    getStyle() {
        return {
            transform: [{ scaleX: this.state.scaleX }],
            opacity: this.state.opacity,
            top: this.props.location === 'top' ? 65 : undefined,
            bottom: this.props.location === 'top' ? undefined : 65,
        };
    }

    render() {
        return (
            <Animated.View
                style={[
                    styles.container,
                    this.getStyle(),
                    this.props.isWarning ? styles.errorContainer : null,
                ]}>
                <Animated.Text
                    style={[
                        styles.text,
                        { opacity: this.state.textOpacity },
                        this.props.isWarning ? styles.errorText : null,
                    ]}>
                    {this.props.text}
                </Animated.Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#14aa4c',
        padding: 10,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: (width - NOTIFICATION_WIDTH) / 2,
        width: NOTIFICATION_WIDTH,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.3,
        elevation: 5,
    },
    errorContainer: {
        backgroundColor: colors.errorContainer,
    },
    text: {
        color: '#fff',
        fontSize: 12,
    },
    errorText: {
        color: '#fff',
    },
});
