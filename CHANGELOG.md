# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2022-03-28

### Added

- Provide the following object as the first argument to all 'onAction' callbacks accepted by all Buttons and the Checkout Flow:

```ts
  {
    user: string, # Users connected address
    contract: string, # Subscription contract address
    network: string # Network that user is connected to
  }
```

## [1.0.1] - 2022-03-23

### Added

- Coinciding with the [Subbi](https://subbi.fi) mainnet release, add the Polygon mainnet USDC contract address. You can now start accepting real payments!

## [1.0.0] - 2022-03-21

- Initial release. Documentation for the library can be found [here](https://docs.subbi.fi/self-hosted-checkout/installation).
