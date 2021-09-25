const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];


router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});


router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title, price: req.body.price, desc: req.body.desc});
    console.log(products);
    res.redirect('/');
});

router.post('/remove-product', (req, res, next)=>{
    console.log("Removing "+req.body.title);
    const index = products.indexOf(req.body.title);
    console.log(index);
    if (index > -2) {
      products.splice(index, 1);
      message = "";
    }
    else {
      message = "ERROR! No Product By That Title";
    }
    products.push();
    
    res.redirect('/');
  });


// The following two lines uses the express module 'exports' to export our 'router' and 'products' constants defined above.
exports.routes = router;
exports.products = products;