//TA06 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/ta06', {
    title: 'Team Activity 06',
    path: '/ta06', // For pug, EJS
    activeTA06: true, // For HBS
    contentCSS: true, // For HBS
  });
});

module.exports = router;
