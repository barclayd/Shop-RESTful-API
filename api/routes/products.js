const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0 ) {
                res.status(200).json({
                    message: 'Handling GET requests to /products',
                    docs
                });
            } else {
                res.status(204).json();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            })
        })

});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: result
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json({
                    message: `Found product of id: ${id}`,
                    doc
                });
            } else {
                res.status(404).json({
                    message: `No valid product found with id: ${id}`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (let ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({
        _id: id
    }, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Updated product of id: ${id}`,
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.remove({
        _id: id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Deleted product of id: ${id}`,
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
            });
        });
});

module.exports = router;
