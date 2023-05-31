const express = require('express');
const sequelize = require('./db/database.connector')
const cors = require('cors');
const router = require('./api/routes/index')
const errorHandler = require('./api/middleware/ErrorHandlingMiddleware');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server working...' });
})

const start = async () => {
    try {
        app.listen(process.env.PROGRAM_PORT, () =>
            console.log(`Server started to ${process.env.PROGRAM_PORT}...`));
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Connected to DB!");
        const CoinEvents = require('./event/coin.events');      
    } catch (error) {
        console.error(error);
    }
}

start();

