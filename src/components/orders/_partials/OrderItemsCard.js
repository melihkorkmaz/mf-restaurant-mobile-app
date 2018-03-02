import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { orderItems, itemDetails, orderItemsByGroup } from '../../../utils/order.helper'

const OrderItemsCard = (props) => {
    const { order, style } = props;



    const renderItem = (item, index) => {
        const renderItemDetails = () => {
            if (item.properties) {
                return (
                    <View>
                        {
                            Object.keys(item.properties).map((key, newIndex) => {
                                const details = item.properties[key];
                                // let details = itemDetails(detail);
                                return <Text key={newIndex} style={{ fontSize: 12, color: "#353434"  }}>{key} : {details}</Text>
                            })
                        }
                        {
                            (item.note && item.note.length > 0) ? <Text style={{ fontSize: 12, color: "#353434"  }}>Note : {item.note}</Text> : null
                        }

                    </View>
                )
            }
        }

        return (
            <View style={orderItemsStyle.itemListContainer} key={index}>
                <View style={{ flex: 5 }}>
                    <Text style={{ color: "#b71c1c" }}>{item.name}</Text>
                    {renderItemDetails()}
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: "right", color: "#353434"  }}>{item.quantity}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: "right", color: "#353434"  }}>${item.totalPrice.toFixed(2)}</Text>
                </View>
            </View>
        )
    };

    const orderGroup = orderItemsByGroup(order);
    

    const renderGroup = (key, index) => {
        const item = orderGroup[key];
        return (
            <View key={index}>
                <View style={orderItemsStyle.groupTitle}>
                    <Text style={{ fontWeight: "500", color: "#353434" , flex: 5 }}>{item.name}</Text>
                    <Text style={{ fontWeight: "500", color: "#353434" , flex: 1, textAlign: "right" }}>Quantity</Text>
                    <Text style={{ fontWeight: "500", color: "#353434" , flex: 1, textAlign: "right" }}>Price</Text>
                </View>
                {
                    item.items.map((subItem, newIndex) => {
                        return renderItem(subItem, newIndex);
                    })
                }
            </View>
        )
    }

    
    console.log("orderGroup", orderGroup)
    return (
        

        <View style={orderItemsStyle.card}>
            <View style={{}}>
                <Text style={{ fontWeight: "bold", marginBottom: 15, fontSize: 17, color: "#353434"  }}>Order Items</Text>
            </View>
            <View style={orderItemsStyle.container}>
                { Object.keys(orderGroup).map(renderGroup.bind(this))}

                <View style={orderItemsStyle.totalPanel}>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={{ flex: 6, color: "#353434", fontSize: 13}}>Subtotal:</Text>
                        <Text style={{ flex: 1, color: "#353434", fontSize: 13, textAlign : "right" }}>${order.basket.total.subTotal.toFixed(2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={{ flex: 6, color: "#353434" , fontSize: 13}}>Tax:</Text>
                        <Text style={{ flex: 1, color: "#353434", fontSize: 13,textAlign : "right" }}>${order.basket.total.tax.toFixed(2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={{ flex: 6, color: "#353434", fontSize: 13 }}>Delivery Charge:</Text>
                        <Text style={{ flex: 1, color: "#353434", fontSize: 13, textAlign : "right" }}>${order.basket.total.deliveryCharge.toFixed(2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={{ flex: 6, color: "#353434", fontSize: 13 }}>Tip:</Text>
                        <Text style={{ flex: 1, color: "#353434", fontSize: 13, textAlign : "right" }}>${order.tip.value.toFixed(2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 6, color: "#353434", fontSize: 15, fontWeight:"500" }}>Total:</Text>
                        <Text style={{ flex: 1, color: "#353434", fontSize: 15, fontWeight:"500", textAlign : "right" }}>${order.basket.total.grandTotal.toFixed(2)}</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}

const orderItemsStyle = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#e5e5e5"
    },
    card : {
        backgroundColor: "#FFF",
        marginBottom: 25,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
    },
    groupTitle: {
        backgroundColor: "#f5f5f5",
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    itemListContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    totalPanel: {
        borderTopColor: "#e5e5e5",
        borderTopWidth: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15
    }
})

export default OrderItemsCard;