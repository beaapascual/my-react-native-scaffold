import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, PrimaryButton } from '~/components';
import { scrollContainer, colors, fontSizes } from '~/styles';

export default class Register extends PureComponent {
    static propTypes = {
        isRegisterProcessing: PropTypes.bool.isRequired,
        errors: PropTypes.object.isRequired,
        updateErrors: PropTypes.func.isRequired,
        onLogin: PropTypes.func.isRequired,
        onRegister: PropTypes.func.isRequired,
        t: PropTypes.func.isRequired,
    };

    state = {
        password: '',
        email: '',
        confirmPassword: '',
        sConfirmPasswordVisible: false,
        isPasswordVisible: false,
    };

    onTextChange = (value, option) => {
        this.setState({
            [option]: value,
        });

        this.props.errors.hasError[option] && this.props.updateErrors(option);
    };

    togglePassword = field => {
        this.setState({ [field]: !this.state[field] });
    };

    onRegister = () => {
        this.props.onRegister({
            password: this.state.password,
            email: this.state.email,
            confirmPassword: this.state.confirmPassword,
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
                        ref={input =>
                            (this.password = input && input.inputRef)}
                        hasError={!!this.props.errors.hasError.password}
                        errorText={this.props.errors.hasError.password}
                        onChangeText={value =>
                            this.onTextChange(value, 'password')}
                        returnKeyType='next'
                        secureTextEntry={!this.state.isPasswordVisible}
                        value={this.state.password}
                        rightIcon={<TouchableOpacity
                            onPress={() =>
                                this.togglePassword('isPasswordVisible')}>
                            <Image
                                source={this.state.isPasswordVisible
                                    ? require('~images/icons/hide_icon.png')
                                    : require('~images/icons/show_icon.png')}
                                style={styles.inputIcon}/>
                        </TouchableOpacity>}
                        onSubmitEditing={() =>
                            this.confirmPassword &&
                            this.confirmPassword.focus()}/>
                    <Text style={{ ...styles.text, marginTop: 8 }}>Confirm Password</Text>
                    <Input
                        ref={input =>
                            (this.confirmPassword = input && input.inputRef)}
                        hasError={!!this.props.errors.hasError.confirmPassword}
                        errorText={this.props.errors.hasError.confirmPassword}
                        onChangeText={value =>
                            this.onTextChange(value, 'confirmPassword')}
                        returnKeyType='go'
                        secureTextEntry={!this.state.isConfirmPasswordVisible}
                        onSubmitEditing={() => this.onLogin()}
                        value={this.state.confirmPassword}
                        rightIcon={<TouchableOpacity
                            onPress={() =>
                                this.togglePassword(
                                    'isConfirmPasswordVisible',
                                )}>
                            <Image
                                source={this.state.isConfirmPasswordVisible
                                    ? require('~images/icons/hide_icon.png')
                                    : require('~images/icons/show_icon.png')}
                                style={styles.inputIcon}/>
                        </TouchableOpacity>}/>
                    <TouchableOpacity style={styles.fogotPasswordContainer}>
                        <Text style={{ ...styles.text, textAlign: 'center' }}>
                            Terms and Conditions
                        </Text>
                    </TouchableOpacity>
                    <PrimaryButton
                        title={'Register'}
                        onPress={this.onRegister}
                        raised={false}
                        loading={this.props.isRegisterProcessing}/>
                </View>
                <TouchableOpacity onPress={this.props.onLogin}>
                    <Text style={styles.text}>Login</Text>
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
        marginVertical: 10,
    },
});
