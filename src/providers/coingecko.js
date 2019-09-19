'use strict'

const CoinGecko = require('coingecko-api')

const client = new CoinGecko()

/**
 * Get the USD rate for an asset from CoinGecko.
 *
 * @param {string} id An asset identifier as `ethereum`.
 * @returns {Promise<number>} The price in USD.
 */
const getCoinPrice = id =>
  client.coins
    .fetch(id)
    .then(response =>
      response.data &&
      response.data.market_data &&
      response.data.market_data.current_price &&
      typeof response.data.market_data.current_price.usd === 'number'
        ? response.data.market_data.current_price.usd
        : null
    )

module.exports = {
  getCoinPrice
}
