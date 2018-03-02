import config from '../../config'
import axios from 'axios'
import OrderListener from '../../utils/order.listener'

// ------------------------------------
// Constants
// ------------------------------------
export const RECIVE_ORDERS = 'RECIVE_ORDERS'
export const SELECT_ORDER = 'SELECT_ORDER'
export const SET_FETCHING = 'SET_FECHING'
export const NEW_ORDER_RECIVERD = 'NEW_ORDER_RECIVERD'
export const ORDER_VIEWED = 'ORDER_VIEWED'

// ------------------------------------
// Actions
// ------------------------------------
export function reciveOrders(orders = []) {
    return {
        type: RECIVE_ORDERS,
        payload: orders
    }
}

export function selectOrder(order) {
    return (dispatch) => {
        dispatch({
            type: SELECT_ORDER,
            payload: order
        })
    }
}

export function orderViewed(order) {
    return (dispatch) => {
        dispatch({
            type: ORDER_VIEWED,
            payload: order
        })
    }
}

export const getOrders = (callback) => {
    return (dispatch) => {
        dispatch({
            type: SET_FETCHING,
            payload: true
        })


        setTimeout(() => {
            axios.get(`${config.api}/orders`)
                .then((response) => response.data)
                .then((orders) => {
                    dispatch(reciveOrders(orders));
                    dispatch({
                        type: SET_FETCHING,
                        payload: false
                    });

                    if (callback) callback();

                })
                .catch((err) => {
                    console.log("err", err);
                });
        }, 2000);
    }
}

export const newOrderRecived = (data) => {
    
    return (dispatch, getState) => {
        Object.keys(data).forEach((key) => {
            axios.get(`${config.api}/orders/${key}`)
                .then((response) => response.data)
                .then((order) => {
                    order.isNew = data[key];
                    OrderListener.startAlert();
                    dispatch({
                        type: NEW_ORDER_RECIVERD,
                        payload: order
                    })

                })
                .catch((err) => {
                    console.log("err", err);
                });
        });


    }
}

const initialState = {
    isFetching: false,
    hasRecived: false,
    data: [],
    newOrders: []
}
export default function ordersReducer(state = initialState, action) {
    switch (action.type) {
        case RECIVE_ORDERS:
            return Object.assign({}, state, { data: action.payload, hasRecived: true });
        case SELECT_ORDER:
            return Object.assign({}, state, { selectedOrder: action.payload })
        case SET_FETCHING:
            return Object.assign({}, state, { isFetching: action.payload });
        case NEW_ORDER_RECIVERD:
            console.log("action.payload", action.payload);
            return Object.assign({}, state, { newOrders: [...state.newOrders, action.payload] });

        case ORDER_VIEWED:
            let currentOrders = [...state.data];
            action.payload.isNew = false;
            
            const currentNewOrder = state.newOrders.find(x => x._id === action.payload._id);
            const indexOf = state.newOrders.indexOf(currentNewOrder);

            let newOrders = [...state.newOrders.slice(0, indexOf), ...state.newOrders.slice(indexOf + 1, state.newOrders.length)];            

            OrderListener.stopAlert(action.payload.orderNumber);

            if (!currentOrders.find((item) => item._id === action.payload._id)) {
                currentOrders.push(action.payload);
            }


            return Object.assign({}, state, { data: currentOrders, newOrders : newOrders });

        default:
            return state;
    }
}