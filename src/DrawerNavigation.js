import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import Dashboard from './components/dashboard/Dashboard'
import Settings from './components/settings/Settings';
import Orders from './components/orders/Orders'
import OrderDetails from './components/orders/OrderDetails'

const DrawerStack = DrawerNavigator({
    ordersScreen: { screen: Orders },
    settingsScreen: { screen: Settings },
    orderDetails: { screen: OrderDetails }
}
)

const DrawerNavigation = StackNavigator({
    DrawerStack: { screen: DrawerStack }
}, {
        headerMode: 'float',
        navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#BF2424' },
            headerTintColor: 'white',
            gesturesEnabled: false,
            headerLeft: <Text style={{ paddingLeft: 10 }} onPress={() => {
                if (navigation.state.index === 0) {
                    navigation.navigate('DrawerOpen')
                } else {
                    navigation.navigate('DrawerClose')
                }
            }}>
                <FontAwesome style={{ color: "#FFF", fontSize: 20, fontWeight: "200" }}>{Icons.bars}</FontAwesome>
            </Text>
        })
    })

export default DrawerNavigation;