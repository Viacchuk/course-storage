const { Interval, History } = require('../db/models');

class DbEvents {
    async create(table, item) {
        if (table === 'Interval')
            await Interval.create({ interval: item });
        if (table === 'History')
            await History.create({ course: item[0], time: item[1] });
    }

    async read(table, where, limit, offset) {
        const options = {
            where,
        };

        if (limit) {
            options.limit = limit;
        }

        if (offset) {
            options.offset = offset;
        }

        if (table === 'Interval') {
            const result = await Interval.findAll(options);
            return result;
        }

        if (table === 'History') {
            const result = await History.findAll(options);
            return result;
        }

        return null;
    }

    async update(table, where, item) {
        if (table === 'Interval')
            await Interval.update({ interval: item }, { where });
        if (table === 'History')
            await History.update({ course: item[0], time: item[1] }, { where });
    }

    async delete(table, where) {
        if (table === 'Interval')
            await Interval.destroy({ where });
        if (table === 'History')
            await History.destroy({ where });
    }
}

module.exports = new DbEvents();
