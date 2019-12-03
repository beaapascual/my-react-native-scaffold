import PropTypes from 'prop-types';
import React, { PureComponent, Fragment } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { colors } from '~/styles';

export default class Input extends PureComponent {
    static propTypes = {
        leftIcon: PropTypes.element,
        rightIcon: PropTypes.element,
        hasError: PropTypes.bool,
        autoFocus: PropTypes.bool,
        autoCorrect: PropTypes.bool,
        spellCheck: PropTypes.bool,
        containerStyle: PropTypes.object,
        customStyle: PropTypes.object,
        customInputStyle: PropTypes.object,
        inputTextColor: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        isCustom: PropTypes.bool,
        placeholderTextColor: PropTypes.string,
        value: PropTypes.string,
        errorText: PropTypes.string,
        bottomPlaceHolder: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            isFocused: !!props.autoFocus,
        };
    }

    onFocus = e => {
        this.setState({
            isFocused: true,
        });

        typeof this.props.onFocus === 'function' && this.props.onFocus(e);
    };

    onBlur = e => {
        this.setState({
            isFocused: false,
        });

        typeof this.props.onBlur === 'function' && this.props.onBlur(e);
    };

    render() {
        const {
            value,
            hasError,
            errorText,
            leftIcon,
            rightIcon,
            autoCorrect,
            spellCheck,
            customStyle,
            customInputStyle,
            bottomPlaceHolder,
            ...rest
        } = this.props;

        return (
            <Fragment>
                <View
                    style={{
                        ...styles.container,
                        ...styles.inputFlat,
                        ...customStyle,
                        ...(hasError ? styles.inputFlatError : {}),
                    }}>
                    {leftIcon}
                    <TextInput
                        ref={input => (this.inputRef = input)}
                        autoCorrect={autoCorrect ? autoCorrect : false}
                        spellCheck={spellCheck ? spellCheck : false}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        style={{
                            ...(value
                                ? styles.inputStyleBasic
                                : styles.placeholderStyle),
                            ...customInputStyle,
                            paddingLeft: leftIcon ? 15 : 0,
                            paddingRight: rightIcon ? 15 : 0,
                        }}
                        value={value}
                        placeholderTextColor={colors.textSecondary}
                        {...rest}/>
                    {rightIcon}
                    {bottomPlaceHolder ? (
                        <Text
                            style={{
                                position: 'absolute',
                                bottom: -10,
                                right: 5,
                                color: colors.textSecondary,
                                ...styles.placeholderStyle,
                            }}>
                            {bottomPlaceHolder}
                        </Text>
                    ) : null}
                </View>
                {hasError ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                ) : null}
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 7,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    inputStyleBasic: {
        flex: 1,
        fontSize: 17,
        minHeight: 35,
        color: '#1A2C5B',
    },
    placeholderStyle: {
        flex: 1,
        fontSize: 14,
        minHeight: 35,
        color: '#8E98A7',
    },
    inputFlat: {
        borderRadius: 5,
        borderWidth: 1.3,
        borderColor: 'rgba(142, 152, 167, 0.3)',
    },
    inputFlatError: {
        borderColor: colors.brandRed,
    },
    errorContainer: {
        marginTop: -3,
        paddingLeft: 5,
    },
    errorText: {
        fontSize: 12,
        color: colors.brandRed,
    },
});
