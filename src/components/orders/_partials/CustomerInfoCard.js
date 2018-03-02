import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CustomerInfoCard extends React.Component {

    render() {
        const { order, style } = this.props;

        const customerInfo = [
            { label: "Name", value: order.user.name },
            { label: "Address", value: order.address ? order.address.googleFormatted : "-" },
            { label: "Address Note", value: order.address ? order.address.note : "-" },
            { label: "Phone", value: order.address ? order.address.phone : (order.phone : "-") },
            { label: "Email", value: order.address ? order.address.email : order.user.email }
        ]

        return (
            <View style={style.card}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={style.title}>Customer Details</Text>
                </View>
                {customerInfo.map((item, index) => (
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



export default CustomerInfoCard;