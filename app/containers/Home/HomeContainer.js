/* eslint-disable no-prototype-builtins */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Home } from '~/components';

class HomeContainer extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        screenProps: PropTypes.object.isRequired,
        profileData: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            isRefreshing: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;

        this.onLoad();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onLoad = async () => {
        this.setState({ isRefreshing: false });
    };

    onRefresh = () => {
        this.setState({ isRefreshing: true }, () => {
            this.onLoad();
        });
    };

    render() {
        return (
            <Home
                profileData={this.props.profileData}
                onLoad={this.onLoad}
                isRefreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}/>
        );
    }
}

function mapStateToProps({ authentication, indicators }) {
    return {
        profileData: authentication.profileData,
        isLoading: indicators.isLoading,
    };
}

export default connect(mapStateToProps)(HomeContainer);
