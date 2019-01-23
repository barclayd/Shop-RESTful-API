const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    })
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Handling POST requests to /orders',
        order
    })
});

router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(200).json({
        message: `Handling GET requests to /orders for id: ${id}`,
        id
    })
});

router.delete('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    res.status(202).json({
        message: `Handling DELETE requests to /orders for id: ${id}`,
        id
    })
});



module.exports = router;
