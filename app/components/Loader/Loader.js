import PropTypes from 'prop-types';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

Loader.propTypes = {
    isLoading: PropTypes.bool,
};

export default function Loader(opt) {
    return (
        <Spinner
            color={'#611DE9'}
            animation={'fade'}
            overlayColor={'rgba(255, 255, 255, 0.5)'}
            cancelable={true}
            visible={opt.isLoading}/>
    );
}
