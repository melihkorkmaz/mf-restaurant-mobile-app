import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import { changeStatus } from '../../store/reducers/restaurant';

class Settings extends React.Component {

    constructor() {
        super();
        this.state = {
            statuses: [
                {
                    name: "Auto",
                    value: "auto"
                },
                {
                    name: "Offline",
                    value: "offline"
                }, {
                    name: "Online",
                    value: "online"
                }]
        }
    }


    static navigationOptions = {
        title: 'Settings',
        drawerLabel: 'Settings'
    };

  

    renderRow(rowData, index) {
        return <TouchableOpacity key={index} onPress={() => this.props.changeStatus(rowData.value)}>
            <Text style={this.props.restaurant.status === rowData.value ? orderStyle.listRowSelected : orderStyle.listRow}>{rowData.name}</Text>
        </TouchableOpacity>
    }

    render() {
        console.log("render now");
        return (
            <View style={orderStyle.container}>
                <View style={orderStyle.card}>
                    {this.state.statuses.map(this.renderRow.bind(this))}
                </View>
            </View>
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
        borderColor: '#d6d7da'
    },
    title: {
        fontWeight: "500",
        fontSize: 17,
        color: "#353434"
    },
    listRow: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d6d7da"
    },
    listRowSelected: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d6d7da",
        backgroundColor: "#2ecc71",
        color: "#FFF"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        changeStatus: status => dispatch(changeStatus(status))
    }
}

const mapStateToProps = state => {
    return {
        restaurant: state.restaurant
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);