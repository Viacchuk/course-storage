const dbController = require('../../event/db.ivents');
const ApiError = require('../error/ApiError');

class HistoryController {
    async get(req, res) {
        let { limit, offset } = req.headers;
        const where = {};

        if (limit) {
            limit = parseInt(limit);
            if (!limit || limit < 1) {
                return next(ApiError.badRequest('Incorrect limit'));
            }
        }

        if (offset) {
            offset = parseInt(offset);
            if (!offset || offset < 1) {
                return next(ApiError.badRequest('Incorrect offset'));
            }
        }

        const query = await dbController.read('History', where, limit, offset);
        const result = query.map(({ course, time }) => ({ course, time }));
        res.status(200).json(result);
    }
}

module.exports = new HistoryController();
