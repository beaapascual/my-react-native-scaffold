import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ViewPropTypes } from 'react-native';
import FastImage from 'react-native-fast-image';

export default class WebImage extends PureComponent {
    static propTypes = {
        image: PropTypes.any,
        resizeMode: PropTypes.oneOf(['cover', 'contain']),
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        resizeMode: 'cover',
    };

    render() {
        const { resizeMode, style, image } = this.props;

        return (
            <FastImage
                source={image}
                resizeMode={resizeMode === 'cover'
                    ? FastImage.resizeMode.cover
                    : FastImage.resizeMode.contain}
                style={style}/>
        );
    }
}
