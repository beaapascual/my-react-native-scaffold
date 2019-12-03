import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function PreSplash() {
    return (
        <View style={styles.background}>
            <Text>DESIGN YOUR PRESPLASH</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
