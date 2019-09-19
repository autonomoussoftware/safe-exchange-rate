'use strict'

const axios = require('axios').default

/**
 * Get the USD rate for an asset from CoinCap.
 *
 * @param {string} id An asset identifier as `ethereum`.
 * @returns {Promise<number>} The price in USD.
 */
const getAsset = id =>
  axios
    .get(`https://api.coincap.io/v2/assets/${id}`)
    .then(response =>
      response.data &&
      response.data.data &&
      typeof response.data.data.priceUsd === 'string'
        ? Number.parseFloat(response.data.data.priceUsd)
        : null
    )

module.exports = {
  getAsset
}
