
/**
 * This service file contains the service layer methods for manipulating the order objects.
 */
var logger = require("../../logger.js");
var Promise = require('bluebird');
var _ = require('underscore');
var fs = require('fs');
// var itemFile = require('../../../item.json')
var orderFile = require('../../orders.json')

//Creating the object which will finally be exported
var orderService = {
    placeOrder: placeOrder,
    getOrderById: getOrderById,
    getOrders:getOrders
};

/**
 * This method prepares the actual employee document to be stored in database.
 * @param {*order} order
 */
function placeOrder(order) {
    return new Promise(function (resolve, reject) {
        var orderNo = new Date().getTime();
        var obj = {
            orderId: orderNo,
            gtin: order.gtin,
            orderQty: order.orderQuantity
        }
        orderFile.orders.push(obj);
        fs.writeFile(__dirname + "/../../orders.json", JSON.stringify(orderFile), function (err) {
            if (err) {
                logger.error("Some error while adding new order in the order file");
                reject(err);
            } else {
                logger.info("order No:" + orderNo + " placed successfully");
                resolve(obj);
            }
        });
    })
};


function getOrderById(orderId) {
    return new Promise(function (resolve, reject) {
        var orders=orderFile.orders;
        if (orders!= undefined && orders != null) {
            console.log("orders are",orders);
            var order = _.findWhere(orders, {orderId: orderId });
            // console.log("order is",order);
            resolve(order);
        }
        else {
            logger.error("Some error in fetching the items from inventory");
            reject("Some error in fetching the items from inventory");
        }
    })
}


function getOrders() {
    return new Promise(function (resolve, reject) {
        var orders=orderFile.orders;
        if (orders!= undefined && orders != null) {
            logger.info("orders fetched successfully")
            resolve(orders);
        }
        else {
            logger.error("Some error in fetching the items from inventory");
            reject("Some error in fetching the items from inventory");
        }
    })
}
//Exporting allthe methods in an object
module.exports = orderService;