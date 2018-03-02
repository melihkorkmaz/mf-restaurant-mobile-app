import SoundHelper from './sound.helper';
import config from '../config';
import * as firebase from "firebase";
const DeviceInfo = require('react-native-device-info');

const OrderListener = {
    hasInitialized: false,
    inAlertMode: false,
    newOrdersLength: 0,
    alertRepeat: 6,
    alertCount: 0,
    alertLength: 30000, //Sound for 30 second
    alertDelay: 10000, //Delay between alerts 30 second
    init: (newOrderDispatch, restaurantId) => {
        if (OrderListener.hasInitialized) return;

        OrderListener.restaurantId = restaurantId;
        OrderListener.newOrderDispatch = newOrderDispatch;

        SoundHelper.init();

        //Set Listener
        OrderListener.setNewFirebaseListener();
        OrderListener.listenFirebase();

        OrderListener.hasInitialized = true;
    },
    setNewFirebaseListener: () => {
        const deviceInfo = DeviceInfo.getUniqueID();
        OrderListener.listenerKey = deviceInfo === "unknown" ? Date.now() : deviceInfo;
        var ref = firebase.database().ref("listeners_test/" + OrderListener.restaurantId + "/" + OrderListener.listenerKey);
        ref.set({ isActive: true });
        ref.onDisconnect().remove();
    },

    listenFirebase: () => {
        var rootRef = firebase.database().ref('listeners_test/' + OrderListener.restaurantId + '/' + OrderListener.listenerKey + "/orders");

        rootRef.on('value', function (snapshot) {
            console.log("ON VALUE", snapshot.val());
            var data = snapshot.val();
            if (data) {
                OrderListener.setNewOrders(data);
            }
        });

    },

    removeCurrentFirebaseListener: () => {
        var ref = firebase.database().ref("listeners_test/" + OrderListener.restaurantId + "/" + OrderListener.listenerKey);
        ref.remove();
    },

    removeOrderListener: (orderNumber) => {
        var ref = firebase.database().ref("listeners_test/" + OrderListener.restaurantId + "/" + OrderListener.listenerKey + "/orders/" + orderNumber);
        ref.remove();
    },

    reset: () => {

        OrderListener.hasInitialized = false;
    },

    setNewOrders: (data) => {
        OrderListener.newOrdersLength = Object.keys(data).length;
        OrderListener.newOrderDispatch(data);
    },

    startAlert: () => {
        SoundHelper.play();
        setTimeout(() => {
            SoundHelper.stop();
        }, OrderListener.alertLength);
    },

    stopAlert: (orderNumber) => {
        var rootRef = firebase.database().ref('listeners_test/' + OrderListener.restaurantId + '/' + OrderListener.listenerKey + "/orders/" + orderNumber);
        rootRef.remove();
        SoundHelper.stop();
    }

}


export default OrderListener;