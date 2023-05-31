const Router = require('express');
const router = new Router();
const intervalController = require('../controllers/intervalController');

router.get('/', intervalController.get)
router.put('/update', intervalController.update);

module.exports = router;