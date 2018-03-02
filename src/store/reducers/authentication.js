import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const SET_AUTH_DATA = 'SET_AUTH_DATA'


export function setAuthData(data = {}) {
    return (dispatch) => {
        if (data.token) {
            const storageItem = { token : data.token, restaurantId : data.restaurantId };
            AsyncStorage.setItem('authToken', JSON.stringify(storageItem), () => {
                dispatch({
                    type: 'SET_AUTH_DATA',
                    payload: data
                })
            });
        } else {
            dispatch({
                type: 'SET_AUTH_DATA',
                payload: data
            })
        }
    }
}

export default function authenticationReducer(state = { isAuthenticated: false }, action) {
    switch (action.type) {
        case SET_AUTH_DATA:
            if(action.payload.token){
                axios.defaults.headers.common['x-access-token'] = action.payload.token;
                axios.defaults.headers.common['x-source'] = "admin-app";
            }
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}