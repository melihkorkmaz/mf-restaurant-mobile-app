import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import axios from 'axios';
import config from '../../config';
import { setAuthData } from '../../store/reducers/authentication';
import Splash from '../Splash';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            isFetching: false,
            isAppLoaded: false
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('authToken').then((authToken) => {
            if (authToken) {
                authToken = JSON.parse(authToken);
                this.props.setAuthData({ isAuthenticated: true, token: authToken.token, restaurantId : authToken.restaurantId });
                this.props.navigation.navigate('DrawerStack');
            } else {
                this.props.setAuthData({ isAuthenticated: false });
            }

            this.setState({ isAppLoaded: true });
        });
    }

    async onLoginPressed() {
        if (this.state.email === '' || this.state.password === '') return;

        this.setState({ isFetching: true });
        axios.post(`${config.api}/auth/sign-in`, { email: this.state.email, password: this.state.password })
            .then(res => res.data)
            .then(res => {
                if (res.status) {
                    this.props.setAuthData({ token: res.token, isAuthenticated: true, fetching: false, restaurantId : res.restaurantId });
                    this.setState({ error: "", isFetching: false });
                    this.props.navigation.navigate('DrawerStack');
                } else {
                    this.setState({ error: res.message, isFetching: false });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const loginText = this.state.isFetching ? "Please wait..." : "LOGIN";

        const activeView = () => {
            if (this.state.isAppLoaded) {
                return (
                    <View style={styles.container}>
                        <StatusBar
                            barStyle="light-content"
                        />
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>Menufield Sign In</Text>
                        </View>
                        <View>
                            <TextInput
                                placeholder="E-mail address"
                                onChangeText={(text) => this.setState({ email: text })}
                                placeholderTextColor="rgba(255,255,255, 0.7)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                returnKeyType="next"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onSubmitEditing={() => this.passwordInput.focus()}
                            />

                            <TextInput
                                placeholder="Password"
                                onChangeText={(text) => this.setState({ password: text })}
                                placeholderTextColor="rgba(255,255,255, 0.7)"
                                underlineColorAndroid='rgba(0,0,0,0)'
                                returnKeyType="go"
                                secureTextEntry
                                ref={(input) => { this.passwordInput = input }}
                                onSubmitEditing={() => { this.onLoginPressed() }}
                                style={styles.input}
                            />
                            <TouchableOpacity style={styles.buttonContainer} onPress={this.onLoginPressed.bind(this)}>
                                <Text style={styles.buttonText}>{loginText}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.errorText}>{this.state.error}</Text>
                        </View>
                    </View>
                )
            } else {
                return (
                    <Splash />
                )
            }
        }

        return (
            activeView()
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#B71C1C',
        padding: 20
    },
    formWrapper: {
        backgroundColor: '#FFF',
        padding: 10
    },
    input: {
        height: 40,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255, 0.4)',
        color: '#FFF',
        paddingHorizontal: 10
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleWrapper: {
        alignItems: 'center',
        paddingBottom: 15
    },
    buttonContainer: {
        backgroundColor: '#263238',
        paddingVertical: 10,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '700'
    },
    errorText: {
        color: '#FFF',
        textAlign: 'center',
        paddingTop: 15
    }
})


const mapDispatchToProps = (dispatch) => {
    return {
        setAuthData: (data) => dispatch(setAuthData(data))
    }
}

export default connect(undefined, mapDispatchToProps)(Login)