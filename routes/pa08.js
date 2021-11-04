const express = require('express');
const router = express.Router();

const pa08Controller = require('../controllers/pa08');

router.get('/', pa08Controller.pullJson);
router.post('/', pa08Controller.buildIndex);

module.exports = router;
