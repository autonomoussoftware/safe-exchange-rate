# safe-exchange-rate

[![Build Status](https://travis-ci.com/autonomoussoftware/safe-exchange-rate.svg?branch=master)](https://travis-ci.com/autonomoussoftware/safe-exchange-rate)
[![Code Style](https://img.shields.io/badge/code%20style-bloq-0063a6.svg)](https://github.com/bloq/eslint-config-bloq)
[![Known Vulnerabilities](https://snyk.io/test/github/autonomoussoftware/safe-exchange-rate/badge.svg?targetFile=package.json)](https://snyk.io/test/github/autonomoussoftware/safe-exchange-rate?targetFile=package.json)

Safely get exchange rates from different providers.
If any provider is down or failing, a different one from an internal list will be used.

The following exchange rate pairs are currently supported:

- ETH:USD
- ETC:USD
- QTUM:USD

Only 100% open and free providers are queried:

- [Bittrex](https://bittrex.com)
- [CoinCap](https://coincap.io)
- [CoinGecko](https://coingecko.com)

## Installation

```shell
npm install safe-exchange-rate
```

## Usage

```js
const getExchangeRate = require('safe-exchange-rate')

getExchangeRate('ETH:USD').then(function (rate) {
  console.log(rate) // 225.68
}
```

## API

### getExchangeRate(pair) ⇒ `Promise<number>`

Obtain the exchange rate between two assets given list of providers. If one
fails for any reason, the next in the list is used. The providers include:
Bittrex, CoinCap, CoinGecko.

**Returns**: `Promise<number>` - The exchange rate.

| Param | Type     | Description                   |
| ----- | -------- | ----------------------------- |
| pair  | `string` | The rate pair like `ETH:USD`. |

## License

MIT
