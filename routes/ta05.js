//TA05 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/ta05', {
    title: 'Team Activity 05',
    path: '/ta05', // For pug, EJS
    activeTA06: true, // For HBS
    contentCSS: true, // For HBS
  });
});

module.exports = router;
