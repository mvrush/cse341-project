const express = require('express');
const router = express.Router();

const pa08Controller = require('../controllers/pa08');

router.get('/', pa08Controller.processJson);
router.post('/', pa08Controller.getIndex);

module.exports = router;
