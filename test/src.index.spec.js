'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const nock = require('nock')

const { getExchangeRate } = require('..')

chai.use(chaiAsPromised).should()

describe('Get exchange rates', function () {
  beforeEach(function () {
    nock.disableNetConnect()
  })

  it('should get ETH exchange rate from Bittrex', function () {
    nock.enableNetConnect('bittrex.com')
    return getExchangeRate('ETH:USD').then(function (rate) {
      chai.expect(rate).be.a('number')
    })
  })

  it('should get ETH exchange rate from CoinCap', function () {
    nock.enableNetConnect('api.coincap.io')
    return getExchangeRate('ETH:USD').then(function (rate) {
      chai.expect(rate).be.a('number')
    })
  })

  it('should get ETH exchange rate from CoinGecko', function () {
    nock.enableNetConnect('api.coingecko.com')
    return getExchangeRate('ETH:USD').then(function (rate) {
      chai.expect(rate).be.a('number')
    })
  })

  it('should get ETC exchange rate from Bittrex', function () {
    nock.enableNetConnect('bittrex.com')
    return getExchangeRate('ETC:USD').then(function (rate) {
      chai.expect(rate).be.a('number')
    })
  })

  it('should get ETC exchange rate from CoinGecko', function () {
    nock.enableNetConnect('api.coingecko.com')
    return getExchangeRate('ETC:USD').then(function (rate) {
      chai.expect(rate).be.a('number')
    })
  })

  it('should fail if the exchange pair is not supported', function () {
    return getExchangeRate('BSV:USD').should.rejectedWith('not supported')
  })
})
