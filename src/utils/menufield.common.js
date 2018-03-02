import React from 'react';
const menufieldCommon = {
    sort : (items) => {
        return (orderKey) => {
            return items.sort((a,b) => a[orderKey] - b[orderKey]);
        }
    },

    sortDESC : (items) => {
        return (orderKey) => {
            return items.sort((a,b) => a[orderKey] - b[orderKey]).reverse();
        }
    },

    orderASC: (items) => {
        return menufieldCommon.sort(items)('order');
    },

    orderDESC: (items) => {
        return orderASC(items).reverse();
    },

    paddStringLeft: (str) => {
        return (len) => {
            return (addStr) => {
                if(str.length < len){
                    var addLength = str.length - len;
                    for(let i=0; i < addLength; i++)
                        str = addStr + str
                }

                return str;
            }
        }
    },

    workingHour: (hourItem) => {
        const dayName = hourItem.day.toUpperCase().substring(0, 3);
        const startTime = menufieldCommon.paddStringLeft(hourItem.startHour)(2)("0") + ":" + menufieldCommon.paddStringLeft(hourItem.startMinute)(2)("0") + hourItem.startPeriod;
        const endTime = menufieldCommon.paddStringLeft(hourItem.endHour)(2)("0") + ":" + menufieldCommon.paddStringLeft(hourItem.endMinute)(2)("0") + hourItem.endPeriod;

        return (
            <span>
                <span>
                    {dayName}
                </span> : {startTime} TO {endTime}
            </span>
        )
    },

    isNumber : (param) => {
        const intRegex = /^\d+$/;
        return intRegex.test(param)
    }

    
}

export default menufieldCommon;