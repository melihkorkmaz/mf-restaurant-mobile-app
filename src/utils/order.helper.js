
import moment from 'moment';

export const paymentMethod = (order) => order.paymentType === "CASH" ? "Cash : " + (order.checkoutType === "DELIVERY" ? "Charge On Delivery!" : "Store") : "Paid by Card";
export const checkoutType = (type) => type === "DELIVERY" ? "Delivery" : "Pick-up";
export const orderTime = (order) => order.expectedTime === "NOW" ? "Now" : moment(order.scheduled).format('MM/DD/YYYY hh:mm');


const orderItemGroups = (items) => items.map((basketItem) => basketItem.group.name);
const orderGroupItems = (items) => (groupName) => items.filter((basketItem) => basketItem.group.name === groupName);
const orderItemsAsArray = (obj) => Object.keys(obj).map((key) => { return { group: key, items: obj[key] } });

export const orderItems = (order) => {
    return orderItemsAsArray(orderItemGroups(order.userBasket).reduce((prev, groupName) => {
        prev[groupName] = [...orderGroupItems(order.userBasket)(groupName)]
        return prev;
    }, {}))
}

export const itemDetails = (item) => {
    const details = item.selectedName || item.selections.map((selection) => selection.selectedName ).join(", ");
    return {
        type : item.type,
        description : details
    };
}


/** New Codes */
const setProductPropsForRender = (properties) => {
    if (!properties || properties === null) return {};

    const result = Object.keys(properties).reverse().reduce((prev, current) => {
        prev[current] = typeof properties[current] === "object"
            ? Object.keys(properties[current]).join(', ')
            : properties[current] === "Checked"
                ? "Yes"
                : properties[current];
        return prev;
    }, {});

    return result;
};

export const orderItemsByGroup = order => {
    


    return order.basket.items.reduce((prev, current) => {
        prev[current.group._id] = prev[current.group._id]
            ? prev[current.group._id]
            : {
                name: current.group.name,
                _id: current.group._id,
                items: []
            };

        current.properties = setProductPropsForRender(current.properties);
        prev[current.group._id].items.push(current);
        return prev;
    }, {});
    
}