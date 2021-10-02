//TA07 PLACEHOLDER
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/ta07', {
    title: 'Team Activity 07',
    path: '/ta07', // For pug, EJS
    activeTA06: true, // For HBS
    contentCSS: true, // For HBS
  });
});

module.exports = router;
