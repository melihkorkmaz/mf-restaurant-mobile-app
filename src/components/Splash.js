import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Splash extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Menufield</Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>Powered By Menufield Inc.</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#B71C1C',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title : {
        color: 'white',
        fontSize : 40,
        fontWeight : 'bold'
    },
    subTitle: {
        color: 'white',
        fontWeight : '200',
        paddingBottom : 15
    },
    titleWrapper : {
        flex: 1,
        justifyContent : 'center'
    }
});