const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Order.find()
        .select('-__v')
        .populate('product', '-__v')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                message: 'Handling GET requests to /orders',
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: `http://${process.env.APP_URL}/orders/${doc._id}`
                        }
                    }
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    Order.findById(id)
        .populate('product', '-__v')
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                })
            }
            res.status(200).json({
                message: `Handling GET requests to /orders for id: ${id}`,
                order,
                request: {
                    type: 'GET',
                    url: `http://${process.env.APP_URL}/orders`
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: `http://${process.env.APP_URL}/orders/${result._id}`
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Product not found',
                error: err
            })
        });
});

router.delete('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    Order.deleteOne({
        _id: id
    }).exec()
        .then(result => {
            res.status(202).json({
                message: `Order with id ${id} deleted`,
                request: {
                    type: 'POST',
                    url: `http://${process.env.APP_URL}/orders/`,
                    body: {productID: 'ID', quantity: 'Number'}
                }
            })
        })
    .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;
