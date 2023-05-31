const dbController = require('../../event/db.ivents');
const ApiError = require('../error/ApiError');

class IntervalController {
    async get(req, res) {
        try {
            const intervalRecords = await dbController.read('Interval', { id: 1 });
            if (intervalRecords.length > 0) {
                const interval = intervalRecords[0].interval;
                res.status(200).json({ interval });
            } else {
                res.status(200).json({ message: 'No actual interval' });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async update(req, res, next) {
        let { interval } = req.headers;
        if (!interval) {
            return next(ApiError.badRequest('No interval'));
        }
        interval = parseInt(interval);
        if (!interval || interval < 1) {
            return next(ApiError.badRequest('Incorrect interval'));
        }
        try {
            const intervalRecords = await dbController.read('Interval', { id: 1 });
            if (intervalRecords.length > 0) {
                await dbController.update('Interval', { id: 1 }, interval);
            } else {
                await dbController.create('Interval', { interval });
            }
            res.status(200).json({ message: `Wrote to DB new interval - ${interval}` });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new IntervalController();
