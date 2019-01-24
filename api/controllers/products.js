const Product = require('../models/product');

const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            description: 'GET_PRODUCT_BY_ID',
                            url: `http://${process.env.APP_URL}/products/${doc._id}`
                        }
                    }
                })
            };
            if (docs.length > 0 ) {
                res.status(200).json({
                    response
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

};

exports.products_get_product = (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc) {
                res.status(200).json({
                    message: `Found product of id: ${id}`,
                    product: doc,
                    request: {
                        type: 'GET',
                        description: "GET_ALL_PRODUCTS",
                        url: `http://${process.env.APP_URL}/products`

                    }
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
};

exports.products_create_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://${process.env.APP_URL}/products/${result._id}`

                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.products_update_product = (req, res, next) => {
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
            console.log(result);
            res.status(200).json({
                message: `Updated product of id: ${id}`,
                request: {
                    type: 'GET',
                    url: `http://${process.env.APP_URL}/products/${id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productID;
    Product.deleteOne({
        _id: id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: `Deleted product of id: ${id}`,
                request: {
                    type: 'POST',
                    url: `http://${process.env.APP_URL}/products`,
                    body: {name: 'String', price: 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
            });
        });
};
