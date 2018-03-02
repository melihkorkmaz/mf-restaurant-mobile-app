import { StackNavigator } from 'react-navigation';

import Login from './components/login/Login'

const AuthStack = StackNavigator({
  loginScreen: { screen: Login },
}, {
  initialRouteName: 'loginScreen',
  headerMode: 'none'
})

export default AuthStack