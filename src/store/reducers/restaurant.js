import axios from 'axios'
import config from '../../config'

const INIT_RESTAURANT = 'INIT_RESTAURANT'
const SET_RESTAURANT_STATUS = 'SET_RESTAURANT_STATUS'


export function initRestaurant() {
    return (dispatch) => {
        setTimeout(() => {
            axios.get(`${config.api}/restaurants/me`)
                .then((response) => response.data)
                .then((restaurant) => {
                    
                    dispatch({
                        type: INIT_RESTAURANT,
                        payload: restaurant
                    })

                })
                .catch((err) => {
                    console.log("err", err);
                });
        }, 3000);
    }
}

export function changeStatus(newStatus) {
    
    return dispatch => {
        axios.post(
            `${config.api}/restaurants/toggle-status`,
            {
                status: newStatus
            })
            .then(response => response.data)
            .then(restaurant => {
                dispatch({
                    type: SET_RESTAURANT_STATUS,
                    payload: newStatus
                })
            }, err => console.log(err));
    }
}

export default function restaurantReducer(state = {}, action) {
    switch (action.type) {
        case INIT_RESTAURANT:
            return Object.assign({}, action.payload);
        case SET_RESTAURANT_STATUS:
            return Object.assign({}, state.restaurant, { status: action.payload });
        default:
            return state;
    }
}