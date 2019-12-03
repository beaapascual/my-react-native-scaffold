import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { handleRegisterViaEmail } from '~/redux/modules/authentication';
import { Register } from '~/components';
import { validateEmail } from '~/utils/helpers';
// import { setLoader } from '~/redux/modules/indicator';

class RegisterContainer extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        isAuthenticating: PropTypes.bool,
        isAuthed: PropTypes.bool,
        screenProps: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            errors: {
                hasError: {},
            },
            isRegisterProcessing: false,
            isFacebookProcessing: false,
            isGoogleProcessing: false,
        };
    }

    async componentDidUpdate(prevProps) {
        if (
            this.props.isAuthenticating === false &&
            prevProps.isAuthenticating === true
        ) {
            if (this.props.isAuthed) {
                const resetAction = StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });

                this.props.navigation.dispatch(resetAction);
            }
            else {
                this.setState({
                    isRegisterProcessing: false,
                    isFacebookProcessing: false,
                    isGoogleProcessing: false,
                });
            }
        }
    }

    onRegister = data => {
        if (!this.validateForm(data)) {
            this.props.dispatch(
                handleRegisterViaEmail(data.email, data.password),
            );
        }
    };

    onLogin = () => {
        this.props.navigation.goBack();
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
        else if (data.password !== data.confirmPassword) {
            errors.hasError.password =
                'Password and Confirm Password must be the same';
            errors.hasError.confirmPassword =
                'Password and Confirm Password must be the same';

            this.setState({
                errors,
            });

            return true;
        }

        return false;
    }

    render() {
        return (
            <Register
                onLogin={this.onLogin}
                onRegister={this.onRegister}
                errors={this.state.errors}
                updateErrors={this.updateError}
                isRegisterProcessing={this.state.isRegisterProcessing}/>
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

export default connect(mapStateToProps)(RegisterContainer);
