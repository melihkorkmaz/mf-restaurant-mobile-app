import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as firebase from "firebase";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { View, Text, FlatList, ListItem, TouchableHighlight, TouchableOpacity, StyleSheet, Vibration, RefreshControl, NetInfo, AppState } from 'react-native';

import { getOrders, selectOrder, newOrderRecived, orderViewed } from '../../store/reducers/orders';
import menufieldCommon from '../../utils/menufield.common';
import OrderListener from '../../utils/order.listener';
import NewOrderListener from './NewOrderListener';
import { initRestaurant } from '../../store/reducers/restaurant';

let navOpen = false;

class Orders extends React.Component {

    constructor() {
        super();
        this.state = {
            refreshing: false,
            isConnectedNetwork: true
        };

    }
    static navigationOptions = ({navigation}) => ({
        title: 'Orders',
        headerLeft : undefined
    });

    componentWillMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        AppState.addEventListener('change', this._handleAppStateChange);
        if (!this.props.hasRecived && !this.props.isFetching) {
            this.props.getOrders();
            this.props.initRestaurant();
        }
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            console.log('App has come to the foreground!');
            OrderListener.removeCurrentFirebaseListener();
            OrderListener.setNewFirebaseListener();
            OrderListener.listenFirebase();
        }

    }

    _handleConnectionChange = (isConnected) => {
        if (isConnected) {
            console.log('ONLINE');
            OrderListener.removeCurrentFirebaseListener();
            OrderListener.setNewFirebaseListener();
            OrderListener.listenFirebase();
        }

        this.setState({
            isConnectedNetwork: isConnected
        })
    };

    orderSelected(order) {
        this.props.selectOrder(order);
        const { navigate } = this.props.navigation;
        navigate('orderDetails', { title: order.orderNumber });
    }

    newOrderSelected(order) {
        this.props.selectOrder(order);

        if (order.isNew) {
            this.props.orderViewed(order);
        }
        const { navigate } = this.props.navigation;
        navigate('orderDetails', { title: order.orderNumber });
    }

    renderItem(item) {

        return (
            <TouchableOpacity style={ordersStyle.flatItem} onPress={this.orderSelected.bind(this, item)}>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={ordersStyle.title}>{item.user.name}</Text>
                        <Text style={{ textAlign: "right", flex: 1, color: "#353434" }}>{moment(item.createDate).fromNow()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ fontSize: 12, color: "#353434" }}>Order Number: </Text>
                        <Text style={{ fontSize: 12, color: "#353434" }}>{item.orderNumber}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 1 }}>
                        <Text style={{ fontSize: 12, color: "#353434" }}>Total: </Text>
                        <Text style={{ fontSize: 12, color: "#353434", fontWeight: "500" }}>${item.basket.total.grandTotal.toFixed(2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 1 }}>
                        <Text style={{ fontSize: 12, color: "#353434" }}>Payment Method: </Text>
                        <Text style={{ fontSize: 12, color: "#353434" }}>{item.paymentType}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderNewItem(item) {

        return (
            <TouchableOpacity style={ordersStyle.flatItemNew} onPress={this.newOrderSelected.bind(this, item)}>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={ordersStyle.titleNew}>{item.user.name}</Text>
                        <Text style={{ textAlign: "right", flex: 1, color: "#FFFFFF" }}>{moment(item.createDate).fromNow()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Order Number: </Text>
                        <Text style={{ fontSize: 12, color: "#FFFFFF" }}>{item.orderNumber}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 1 }}>
                        <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Total: </Text>
                        <Text style={{ fontSize: 12, color: "#FFFFFF", fontWeight: "500" }}>${item.basket.total.grandTotal}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 1 }}>
                        <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Payment Method: </Text>
                        <Text style={{ fontSize: 12, color: "#FFFFFF" }}>{item.paymentType}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    itemRender({ item }) {
        return item.isNew ? this.renderNewItem(item) : this.renderItem(item);

    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.props.getOrders(() => {
            this.setState({ refreshing: false })
        });
    }

    render() {

        const orders = this.props.orders.sort((a, b) => {
            const aDate = new Date(a.createDate);
            const bDate = new Date(b.createDate);
            return aDate > bDate ? -1 : 1;
        });

        const newOrders = this.props.newOrders.sort((a, b) => {
            const aDate = new Date(a.createDate);
            const bDate = new Date(b.createDate);
            return aDate > bDate ? -1 : 1;
        });

        const allOrders = [...newOrders, ...orders];

        if (!this.state.isConnectedNetwork) {
            return (
                <View style={{ justifyContent: "center", flex: 1 }}>
                    <Text style={{ color: "#353434", textAlign: "center" }}>Application is offline!</Text>
                </View>
            )
        } else {
            if (this.props.hasRecived) {
                return (
                    <RefreshControl colors={["#9Bd35A", "#689F38"]} onRefresh={this.onRefresh.bind(this)} refreshing={this.state.refreshing}>
                        <FlatList
                            style={ordersStyle.flatList}
                            data={allOrders}
                            renderItem={this.itemRender.bind(this)}
                            keyExtractor={(item) => item._id}
                        />
                        <NewOrderListener />
                    </RefreshControl>
                )
            } else {
                return (
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <Text style={{ color: "#353434", textAlign: "center" }}>Loading...</Text>
                    </View>
                )
            }
        }





    }
}

const ordersStyle = StyleSheet.create({
    flatList: {
        padding: 10,
    },
    flatItem: {
        backgroundColor: "#FFF",
        marginBottom: 5,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
    },
    flatItemNew: {
        backgroundColor: "#27ae60",
        marginBottom: 5,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
    },
    title: {
        fontWeight: "500",
        fontSize: 15,
        flex: 1,
        color: "#353434"
    },
    titleNew: {
        fontWeight: "500",
        fontSize: 15,
        flex: 1,
        color: "#FFFFFF"
    }
})

const mapStateToProps = (state) => {
    return {
        orders: state.orders.data,
        newOrders: state.orders.newOrders,
        hasRecived: state.orders.hasRecived,
        isFetching: state.orders.isFetching,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: (callback) => dispatch(getOrders(callback)),
        selectOrder: (order) => dispatch(selectOrder(order)),
        newOrderRecived: (order) => dispatch(newOrderRecived(order)),
        orderViewed: (order) => dispatch(orderViewed(order)),
        initRestaurant: () => dispatch(initRestaurant())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);