import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { paymentMethod, checkoutType, orderTime } from '../../../utils/order.helper'

class OrderInfoCard extends React.Component {
    render() {
        const { order, style } = this.props;

        const orderInfo = [
            { label: "Type", value: checkoutType(order.carryOrDelivery) },
            { label: "Order Time", value: orderTime(order) },
            { label: "Payment", value: paymentMethod(order) },
            { label: "Credit Card", value: order.creditCard.cardNumber },
            { label: "Tip", value: `$${order.tip.value.toFixed(2)}` }
        ]

        return (
            <View style={style.card}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={style.title}>Order Details</Text>
                </View>
                {orderInfo.map((item, index) => (
                    <View style={style.formRow} key={index}>
                        <Text style={{ flex: 1, color: "#353434" }}>
                            {item.label}
                        </Text>
                        <Text style={{ flex: 3, color: "#353434" }}>
                            : {item.value}
                        </Text>
                    </View>
                ))}
            </View>
        )
    }
}


export default OrderInfoCard;