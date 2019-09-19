'use strict'

const { BittrexClient } = require('bittrex-node')

const client = new BittrexClient()

/**
 * Get the last value of a market or ticker pair from Bittrex.
 *
 * @param {string} market A ticker as `USD-ETH`.
 * @returns {Promise<number>} The last value traded.
 */
const getTickerValue = market =>
  client
    .ticker(market)
    .then(result =>
      result && typeof result.Last === 'number' ? result.Last : null
    )

module.exports = {
  getTickerValue
}
