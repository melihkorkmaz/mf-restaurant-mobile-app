import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, StyleSheet } from 'react-native';


import CustomerInfoCard from './_partials/CustomerInfoCard';
import OrderInfoCard from './_partials/OrderInfoCard';
import OrderItemsCard from './_partials/OrderItemsCard';

class OrderDetails extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.title : "",
        headerRight: (<Text onPress={() => { navigation.navigate('ordersScreen') }} style={{ marginRight: 15, color: "#FFF", fontWeight: "bold", fontSize: 18 }}>X</Text>),
        headerLeft: null,
        drawerLabel: () => null
    });

    render() {
        const order = this.props.selectedOrder;

        return (
            <ScrollView style={orderStyle.container}>
                <CustomerInfoCard order={order} style={orderStyle} />
                <OrderInfoCard order={order} style={orderStyle} />
                <OrderItemsCard order={order} style={orderStyle} />
            </ScrollView>
        )
    }
}

const orderStyle = StyleSheet.create({
    container: {
        padding: 10
    },
    card: {
        backgroundColor: "#FFF",
        marginBottom: 5,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
    },
    title: {
        fontWeight: "500",
        fontSize: 17,
        color: "#353434"
    },
    formRow: {
        flexDirection: 'row',
        marginBottom: 5
    }
})

const mapStateToProps = (state) => {
    return {
        selectedOrder: state.orders.selectedOrder
    }
}

export default connect(mapStateToProps)(OrderDetails);