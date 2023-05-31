const DbEvents = require('./db.ivents');
const fetcher = require('../utils/fetcher');
require('dotenv').config();
const COIN_KEY = process.env.COIN_KEY;
const URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1';

class CoinEvents {
  constructor() {
    this.actualInterval = null;
    this.intervalTimeout = null;
    this.coinTimeout = null;

    this._checkInterval();
    this._checkCoin();
  }

  async _checkInterval() {
    try {
      const interval = await DbEvents.read('Interval', { id: 1 });
      const newInterval = interval ? interval[0].interval : null;

      if (newInterval !== this.actualInterval) {
        this.actualInterval = newInterval;
        console.log(this.actualInterval);
        clearTimeout(this.coinTimeout);
        this._checkCoin();
      }

      clearTimeout(this.intervalTimeout);
      this.intervalTimeout = setTimeout(() => {
        this._checkInterval();
      }, 1000);
    } catch (error) {
      console.error(error);
      clearTimeout(this.intervalTimeout);
      this.intervalTimeout = setTimeout(() => {
        this._checkInterval();
      }, 1000);
    }
  }

  async _checkCoin() {
    try {
      if (this.actualInterval) {
        console.log('Query with interval:');
        const coinInfo = await fetcher(URL, 'GET', {headers: { 'X-CMC_PRO_API_KEY': COIN_KEY }});
        const coinPrice = coinInfo.data[1].quote.USD.price;
        const coinTime = coinInfo.data[1].quote.USD.last_updated;
        DbEvents.create('History', [coinPrice, coinTime]);
        console.log(coinPrice + ' ' + coinTime);
        clearTimeout(this.coinTimeout);
        this.coinTimeout = setTimeout(() => {
          this._checkCoin();
        }, this.actualInterval);
      } else {
        console.log('No interval');
        this.coinTimeout = setTimeout(() => {
          this._checkCoin();
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      this.coinTimeout = setTimeout(() => {
        this._checkCoin();
      }, 5000);
    }
  }
}

module.exports = new CoinEvents();
