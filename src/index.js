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
    fn().catch(function (err) {
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
    case 'BAT:USD':
      return promiseFind(
        [
          () => bittrex.getTickerValue('USD-BAT'),
          () => coincap.getAsset('basic-attention-token'),
          () => coingecko.getCoinPrice('basic-attention-token')
        ].map(ignoreFailure)
      )
    case 'ETH:USD':
      return promiseFind(
        [
          () => bittrex.getTickerValue('USD-ETH'),
          () => coincap.getAsset('ethereum'),
          () => coingecko.getCoinPrice('ethereum')
        ].map(ignoreFailure)
      )
    case 'DAI:USD':
      return promiseFind(
        [
          () => bittrex.getTickerValue('USD-DAI'),
          () => coincap.getAsset('multi-collateral-dai'),
          () => coingecko.getCoinPrice('dai')
        ].map(ignoreFailure)
      )
    case 'ETC:USD':
      return promiseFind(
        [
          () => bittrex.getTickerValue('USD-ETC'),
          () => coincap.getAsset('ethereum-classic'),
          () => coingecko.getCoinPrice('ethereum-classic')
        ].map(ignoreFailure)
      )
    case 'KNC:USD':
      return promiseFind(
        [
          () => coincap.getAsset('kyber-network'),
          () => coingecko.getCoinPrice('kyber-network')
        ].map(ignoreFailure)
      )
    case 'MANA:USD':
      return promiseFind(
        [
          () => bittrex.getTickerValue('USD-MANA'),
          () => coincap.getAsset('decentraland'),
          () => coingecko.getCoinPrice('decentraland')
        ].map(ignoreFailure)
      )
    case 'QTUM:USD':
      return promiseFind(
        [
          () => coincap.getAsset('qtum'),
          () => coingecko.getCoinPrice('qtum')
        ].map(ignoreFailure)
      )
    case 'USDC:USD':
      return promiseFind(
        [
          () => coincap.getAsset('usd-coin'),
          () => coingecko.getCoinPrice('usd-coin'),
          () => bittrex.getTickerValue('USD-USDC')
        ].map(ignoreFailure)
      )
    case 'WBTC:USD':
      return promiseFind(
        [
          () => coincap.getAsset('wrapped-bitcoin'),
          () => coingecko.getCoinPrice('wrapped-bitcoin')
        ].map(ignoreFailure)
      )
    case 'ZRX:USD':
      return promiseFind(
        [
          () => bittrex.getTickerValue('USD-ZRX'),
          () => coincap.getAsset('0x'),
          () => coingecko.getCoinPrice('0x')
        ].map(ignoreFailure)
      )
    default:
      return Promise.reject(new Error('Exchange rate pair not supported'))
  }
}

module.exports = {
  getExchangeRate
}
