'use strict'

const debug = require('debug')('crypto-rates')
const promiseFind = require('promise-find')

const bittrex = require('./providers/bittrex')
const coincap = require('./providers/coincap')
const coingecko = require('./providers/coingecko')

/**
 * Ignore call failures by logging the error and restoring the promise chain and
 * returning null.
 *
 * @param {() => Promise<number>} fn Call to get an exchange rate.
 * @returns {() => Promise<number>} The result or null if an error ocurred.
 */
function ignoreFailure(fn) {
  return () =>
    fn().catch(function(err) {
      debug('Failed to obtain rate: %s', err.message)
      return null
    })
}

/**
 * Obtain the exchange rate between two assets given list of providers. If one
 * fails for any reason, the next in the list is used. The providers include:
 * Bittrex, CoinCap, CoinGecko.
 *
 * @param {string} pair The rate pair like `ETH:USD`.
 * @returns {Promise<number>} The exchange rate.
 */
function getExchangeRate(pair) {
  switch (pair) {
    case 'ETH:USD':
      return promiseFind(
        [
          () => bittrex.getTickerValue('USD-ETH'),
          () => coincap.getAsset('ethereum'),
          () => coingecko.getCoinPrice('ethereum')
        ].map(ignoreFailure)
      )
    case 'ETC:USD':
      return promiseFind(
        [
          () => bittrex.getTickerValue('USD-ETC'),
          () => coingecko.getCoinPrice('ethereum-classic')
        ].map(ignoreFailure)
      )
    default:
      return Promise.reject(new Error('Exchange rate pair not supported'))
  }
}

module.exports = {
  getExchangeRate
}
