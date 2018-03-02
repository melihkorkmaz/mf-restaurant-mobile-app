import { StackNavigator } from 'react-navigation'
import { Animated, Easing } from 'react-native'; 
import AuthStack from './AuthStack'
import DrawerNavigation from './DrawerNavigation'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  authStack: { screen: AuthStack },
  drawerStack: { screen: DrawerNavigation }
}, {
    headerMode: 'none',
    initialRouteName: 'authStack',
    transitionConfig: noTransitionConfig
  })

export default PrimaryNav