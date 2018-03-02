import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { newOrderRecived} from '../../store/reducers/orders';

import OrderListener from '../../utils/order.listener';

export class NewOrderListener extends React.PureComponent{

    componentWillMount(){
        OrderListener.init(this.props.newOrderRecived, this.props.auth.restaurantId);
    }

    render(){
        return <Text></Text>;
    }
}

const mapStateToProps = (state) => {
    return {
        newOrders : state.orders.newOrders,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newOrderRecived : (order) => dispatch(newOrderRecived(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderListener);

