import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Vibration } from 'react-native';
import { connect } from 'react-redux';
import { setAuthData } from '../../store/reducers/authentication';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import KeepAwake from 'react-native-keep-awake';
console.ignoredYellowBox = [
    'Setting a timer'
]
class Dashboard extends React.Component {

    constructor() {
        super();        
    }


    static navigationOptions = {
        title: 'Dashboard',
        headerLeft: null,
        drawerLabel: 'Dashboard'
    };

    test() {
        AsyncStorage.removeItem('authToken', () => {
            this.props.setAuthData({
                isAuthenticated: false
            });

            this.props.navigation.navigate('loginScreen');
        })
    };
    render() {
        const isPlaying = this.state.isPlaying ? "Evet" : "Hayır";

        return (
            <View>
                <TouchableOpacity onPress={this.test.bind(this)}>
                    <Text>
                        <FontAwesome style={{ color: "#B71C1C" }}>{Icons.bars}</FontAwesome>
                    </Text>
                    <Text>{isPlaying}</Text>
                    <Text>{this.state.info}</Text>
                </TouchableOpacity>
                <KeepAwake />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthData: (data) => dispatch(setAuthData(data))
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)