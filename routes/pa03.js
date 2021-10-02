//PA02 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/pa03', {
    title: 'Prove Assignment 03',
    path: '/pa03', // For pug, EJS
  });
});

module.exports = router;
