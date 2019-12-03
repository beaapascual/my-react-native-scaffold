import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, PrimaryButton } from '~/components';
import { scrollContainer, colors, fontSizes } from '~/styles';

export default class Login extends PureComponent {
    static propTypes = {
        isLoginProcessing: PropTypes.bool.isRequired,
        errors: PropTypes.object.isRequired,
        updateErrors: PropTypes.func.isRequired,
        onLogin: PropTypes.func.isRequired,
        onRegister: PropTypes.func.isRequired,
        onForgotPassword: PropTypes.func.isRequired,
    };

    state = {
        isPasswordVisible: false,
        password: '',
        email: '',
    };

    onTextChange = (value, option) => {
        this.setState({
            [option]: value,
        });

        this.props.errors.hasError.password && this.props.updateErrors(option);
        this.props.errors.hasError.email && this.props.updateErrors(option);
    };

    togglePassword = () => {
        this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
    };

    onLogin = () => {
        this.props.onLogin({
            password: this.state.password,
            email: this.state.email,
        });
    };

    render() {
        return (
            <KeyboardAwareScrollView
                style={styles.pageContainer}
                contentContainerStyle={styles.content}
                enableOnAndroid={true}
                extraHeight={120}
                keyboardShouldPersistTaps='handled'>
                <View style={{ width: '100%' }}>
                    <Text style={styles.text}>Email</Text>
                    <Input
                        hasError={!!this.props.errors.hasError.email}
                        errorText={this.props.errors.hasError.email}
                        onChangeText={value =>
                            this.onTextChange(value, 'email')}
                        returnKeyType='next'
                        value={this.state.email}
                        placeholder={'john.doe@email.com'}
                        onSubmitEditing={() =>
                            this.password && this.password.focus()}/>
                    <Text style={{ ...styles.text, marginTop: 8 }}>Password</Text>
                    <Input
                        ref={input => (this.password = input && input.inputRef)}
                        hasError={!!this.props.errors.hasError.password}
                        errorText={this.props.errors.hasError.password}
                        onChangeText={value =>
                            this.onTextChange(value, 'password')}
                        returnKeyType='go'
                        secureTextEntry={!this.state.isPasswordVisible}
                        onSubmitEditing={() => this.onLogin()}
                        value={this.state.password}
                        rightIcon={<TouchableOpacity onPress={this.togglePassword}>
                            <Image
                                source={this.state.isPasswordVisible
                                    ? require('~images/icons/hide_icon.png')
                                    : require('~images/icons/show_icon.png')}
                                style={styles.inputIcon}/>
                        </TouchableOpacity>}/>
                    <TouchableOpacity
                        onPress={this.props.onForgotPassword}
                        style={styles.fogotPasswordContainer}>
                        <Text style={styles.text}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <PrimaryButton
                        title={'Login'}
                        onPress={this.onLogin}
                        raised={false}
                        loading={this.props.isLoginProcessing}/>
                </View>
                <TouchableOpacity onPress={this.props.onRegister}>
                    <Text style={styles.text}>Create Account</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        ...scrollContainer,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 35,
    },
    text: {
        fontSize: fontSizes.base,
        lineHeight: 17,
        color: colors.textSecondary,
    },
    inputIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        opacity: 0.4,
    },
    fogotPasswordContainer: {
        alignSelf: 'flex-end',
        marginVertical: 10,
    },
});
