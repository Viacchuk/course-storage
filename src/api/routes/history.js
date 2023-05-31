const Router = require('express');
const router = new Router();
const historyController = require('../controllers/historyController');

router.get('/', historyController.get)

module.exports = router;