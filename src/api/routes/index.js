const Router = require('express');
const router = new Router();
const historyRouter = require('./history');
const intervalRouter = require('./interval');

router.use('/history', historyRouter);
router.use('/interval', intervalRouter);

module.exports = router;