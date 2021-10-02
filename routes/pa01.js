//PA01 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/pa01', {
    title: 'Prove Assignment 01',
    path: '/pa01', // For pug, EJS
    activeTA06: true, // For HBS
    contentCSS: true, // For HBS
  });
});

module.exports = router;
