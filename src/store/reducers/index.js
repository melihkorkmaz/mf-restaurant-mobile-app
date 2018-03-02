import { combineReducers } from 'redux'
import authenticationReducer from './authentication'
import ordersReducer from './orders'
import restaurantReducer from './restaurant';



const rootReducer = combineReducers({
    auth : authenticationReducer,
    orders : ordersReducer,
    restaurant : restaurantReducer
})

export default rootReducer;