import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebImage } from '~/components';

export default class MediaPreviewModal extends PureComponent {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        media: PropTypes.object,
        replayBtnText: PropTypes.string,
    };

    render() {
        const { media, closeModal, isVisible } = this.props;

        if (!media) {
            return null;
        }

        return (
            <Modal
                isVisible={isVisible}
                swipeDirection='down'
                onSwipe={closeModal}
                style={styles.modal}>
                <SafeAreaView
                    style={styles.container}
                    forceInset={{ top: 'always' }}>
                    <WebImage
                        image={{ uri: media }}
                        resizeMode='contain'
                        style={styles.postImage}/>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={closeModal}>
                        <Icon
                            name='md-close'
                            color='#fff'
                            style={styles.icon}
                            size={30}/>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        margin: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    closeBtn: {
        position: 'absolute',
        top: 15,
    },
    icon: {
        padding: 20,
    },
});
