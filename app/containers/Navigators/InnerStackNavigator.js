import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeContainer from '../Home/HomeContainer';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeContainer,
            navigationOptions: { header: null },
        },
    },
    {
        headerMode: 'screen',
    },
);

const NavContainer = createAppContainer(AppNavigator);

class InnerStackNavigator extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavContainer
                ref={nav => {
                    this.navigatorRef = nav;
                }}
                screenProps={{
                    rootNavigation: this.props.navigation,
                }}/>
        );
    }
}

function mapStateToProps({ authentication }) {
    return {
        isAuthed: authentication.isAuthed,
        profileData: authentication.profileData,
    };
}

export default connect(mapStateToProps)(InnerStackNavigator);
