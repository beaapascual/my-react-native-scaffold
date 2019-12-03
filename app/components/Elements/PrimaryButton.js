import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '~/styles';

export default class PrimaryButton extends PureComponent {
    static propTypes = {
        rounded: PropTypes.bool,
        title: PropTypes.string.isRequired,
        color: PropTypes.string,
        containerViewStyle: PropTypes.object,
        buttonStyle: PropTypes.object,
        titleStyle: PropTypes.object,
        primaryView: PropTypes.object,
        customTitleStyle: PropTypes.object,
    };

    static defaultProps = {
        fontSize: 18,
        raised: true,
        rounded: true,
        color: colors.brand,
        titleStyle: {
            color: '#fff',
            fontSize: 14,
            lineHeight: 17,
            textAlign: 'center',
        },
        disabledStyle: {
            backgroundColor: colors.brand,
        },
    };

    render() {
        const {
            containerViewStyle,
            buttonStyle,
            titleStyle,
            customTitleStyle,
            primaryView,
            ...rest
        } = this.props;

        return (
            <View style={{ ...styles.primaryContainer, ...primaryView }}>
                <Button
                    containerViewStyle={{
                        ...styles.container,
                        ...containerViewStyle,
                    }}
                    buttonStyle={{
                        ...styles.button,
                        ...buttonStyle,
                    }}
                    titleStyle={{
                        ...titleStyle,
                        ...customTitleStyle,
                    }}
                    {...rest}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    primaryContainer: {
        width: '100%',
        alignSelf: 'center',
        marginVertical: 13,
    },
    container: {
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: colors.brand,
        borderRadius: 5,
        height: 50,
    },
});
