//PA02 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/pa02', {
    title: 'Prove Assignment 02',
    path: '/pa02', // For pug, EJS
  });
});

module.exports = router;
