/* eslint-disable no-prototype-builtins */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { Login } from '~/components';
import { validateEmail, isOldUser } from '~/utils/helpers';
import { handleLoginViaEmail } from '~/redux/modules/authentication';
// import { setLoader } from '~/redux/modules/indicator';

class LoginContainer extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        isAuthenticating: PropTypes.bool,
        screenProps: PropTypes.object.isRequired,
        profileData: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoginProcessing: false,
            errors: {
                hasError: {},
            },
            screenData: null,
        };
    }

    async componentDidUpdate(prevProps) {
        if (
            this.props.isAuthenticating === false &&
            prevProps.isAuthenticating === true &&
            this.props.profileData.hasOwnProperty('id')
        ) {
            if (this.props.navigation.isFocused()) {
                if (!isOldUser(this.props.profileData)) {
                    // if with onboarding
                }
                else {
                    const resetAction = StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'MainScreen',
                            }),
                        ],
                    });

                    this.props.navigation.dispatch(resetAction);
                }
            }
            else {
                this.setState({
                    isLoginProcessing: false,
                });
            }
        }
    }

    onLogin = data => {
        if (!this.validateForm(data)) {
            this.props.dispatch(handleLoginViaEmail(data.email, data.password));
        }
    };

    onRegister = () => {
        this.props.navigation.navigate('Register');
    };

    onForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    };

    updateError = field => {
        if (!field) {
            this.setState({
                errors: {
                    hasError: {},
                    errorText: null,
                },
            });

            return;
        }

        const { errors } = this.state;

        errors.hasError[field] = '';

        this.setState({
            errors,
        });
    };

    validateForm(data) {
        const errors = {
            hasError: {},
        };

        if (!validateEmail(data.email)) {
            errors.hasError.email = 'Please enter a valid email address';

            this.setState({
                errors,
            });

            return true;
        }
        else if (data.password.length < 5) {
            errors.hasError.password = 'Please enter at least 5 characters';

            this.setState({
                errors,
            });

            return true;
        }

        return false;
    }

    render() {
        return (
            <Login
                onForgotPassword={this.onForgotPassword}
                onRegister={this.onRegister}
                onLogin={this.onLogin}
                errors={this.state.errors}
                updateErrors={this.updateError}
                isLoginProcessing={this.state.isLoginProcessing}/>
        );
    }
}

function mapStateToProps({ authentication, indicators }) {
    return {
        isAuthenticating: authentication.isAuthenticating,
        authError: authentication.authError,
        isAuthed: authentication.isAuthed,
        profileData: authentication.profileData,
        isLoading: indicators.isLoading,
    };
}

export default connect(mapStateToProps)(LoginContainer);
