
/**
 * This file contains the controller methods related to manipulation of item documents.
 */

//Importing the order service.
var orderService = require("../services/order.service.js");
var logger = require("../../logger.js");

//Importing the response object
var Response = require("../response.js");
var Promise = require("bluebird");

//Creating the object to be exported.
function init(router) {
    router.route('/orders')
        .get(getOrders)
        .post(placeOrder);
    router.route('/orders/:id')
        .get(getOrderById);
};
/**
 * This controller method accepts the item json and passes it to the service layer for saving it as a item document.
 * @param {*} req
 *          The request json containing the payload for creating a item document.
 * @param {*} res
 *          The response json going out of controller layer.
 */
function placeOrder(req, res) {
    var response = new Response();
    var order = req.body;
    orderService.placeOrder(order).then(function (result) {
        response.data.order = result;
        response.status.code = "200";
        response.status.message = "Order Placed Successfully";
        logger.info("Order Placed Successfully");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while placing order {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Order was not placed";
        res.status(500).json(response);
    });
}


function getOrderById(req, res) {
    var response = new Response();
    var orderId = parseInt(req.params.id);
    orderService.getOrderById(orderId).then(function (result) {
        response.data.order = result;
        response.status.code = "200";
        response.status.message = "Order with id:" + orderId + " fetched successfully.";
        logger.info("Order with id:" + orderId + " fetched successfully.");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching Order with id :" + orderId + " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Order was not fetched successfully";
        res.status(500).json(response);
    });
}

function getOrders(req, res) {
    var response = new Response();
    orderService.getOrders().then(function (result) {
        response.data.order = result;
        response.status.code = "200";
        response.status.message = "All Orders fetched successfully.";
        logger.info("All Orders fetched successfully.");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching Orders {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Orders were not fetched successfully";
        res.status(500).json(response);
    });
}


//Finally exporting the employee controller methods as an object.
module.exports.init = init;