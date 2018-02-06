# CryptoCurrency Valuation Tool

This is a simple project that aims to provide tools to help users create their own rules to evaluate cryptocurrency assets (alt coins) and organize their assets.

- Max price is an initial info based on BTC market cap (dominant coin) and the target coin supply. Basically: What would be the price if this coin had the same market cap as BTC?
- Potential growth is the difference between max price and current price
- The user can create custom valuation settings
- Once a coin is tracked it's possible to rate it based on the valuation settings previously defined. These rules will affect the potential growth to generate the expected price and expected growth

##### It works by accessing [cryptocurrency_valuation_api](https://github.com/fredmp/cryptocurrency_valuation_api)

##### The data comes from the public [CoinMarketCap](https://coinmarketcap.com) API. It's updated every 15 minutes and respects the usage limits.

##### Once yarn is installed you can run, build and deploy it by using:

```
yarn dev
yarn build
yarn deploy
```

## Next (possible) steps

- Add unit tests
- Add e2e tests
- Apply some refactoring to extract code to specific components
- Improve assets page to allow the user to register not only the amount but also when a coin is bought or sold and associated costs. That will provide a more accurate overview as well as information such as mean price
- Create an initial page to show in the root path. It could display news and useful graphs for example

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Legal

Cosmos Tecnologia &copy; 2017-2018

[@fredmp](https://twitter.com/fredmp)

[Licensed under the MIT license](https://opensource.org/licenses/mit-license.php)
