# TFM Sdk

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@0xtfm/sdk?color=green&label=npm%20version)](https://www.npmjs.com/package/@0xtfm/sdk)


The @tfm/sdk package allows easy access to the TFM API, providing functionality for interacting with pricing, dex aggregator and ibc transfer and swap.

## Installation

Using npm:

```shell
npm install @0xtfm/sdk
```

Using yarn:

```shell
yarn add @0xtfm/sdk
```

## Usage

```typescript
import { TFM } from "@0xtfm/sdk";

async function main() {
  const sdk = new TFM();

  // initialize the sdk
  await sdk.init();

  // get the price of luna in uusd
  const lunaPrice = await sdk.price.getTokenPrice("uluna", "phoenix-1");
  console.log(lunaPrice);

  // swap route from luna to astro
  const swapRouteFromLunaToAstro = await sdk.dex.getRoute({
    chainId: "phoenix-1",
    sourceDenom: "uluna",
    destinationDenom:
      "terra1nsuqsk6kh58ulczatwev87ttq2z6r3pusulg9r24mfj2fvtzd4uq3exn26",
    amount: 1000,
  });
  console.log(swapRouteFromLunaToAstro);

  // swap msg from luna to astro
  const swapMsgLunaToAstro = await sdk.dex.getMsg({
    chainId: "phoenix-1",
    sourceDenom: "uluna",
    destinationDenom:
      "terra1nsuqsk6kh58ulczatwev87ttq2z6r3pusulg9r24mfj2fvtzd4uq3exn26",
    amount: 1000,
  });
  console.log(swapMsgLunaToAstro);
          
  // get chains on ibc
  const chains = await sdk.ibc.chain.getAllChains();
  console.log(chains);

  // get tokens for a chain
  const terra2Tokens = await sdk.ibc.chain.getAllChainTokens("phoenix-1");
  console.log(terra2Tokens);

  // get ibc transfer route from terra2 to osmosis
  const ibcTransferTerrToOsmsis = await sdk.ibc.transfer.getTransferRoute({
    sourceChainId: "phoenix-1",
    destinationChainId: "osmosis-1",
    sourceDenom: "uluna",
    destinationDenom:
      "ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",
    amount: 1000,
  });
  console.log(ibcTransferTerrToOsmsis);

  // get ibc swap route from terra2 to osmosis
  const ibcSwapRouteTerraToOsmsis = await sdk.ibc.swap.getSwapRoute({
    sourceChainId: "phoenix-1",
    destinationChainId: "osmosis-1",
    sourceDenom: "uluna",
    destinationDenom:
      "ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",
    amount: 1000,
  });
  console.log(ibcSwapRouteTerraToOsmsis);

  // get ibc swap msg and route from terra2 to osmosis
  const ibcSwapMsgAndRouteTerraToOsmsis = await sdk.ibc.swap.getSwapRouteMsgCombined({
    sourceChainId: "phoenix-1",
    destinationChainId: "osmosis-1",
    sourceDenom: "uluna",
    destinationDenom:
      "ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",
    amount: 1000,
  });
  console.log(ibcSwapMsgAndRouteTerraToOsmsis);

}

main().catch((error) => console.error(error));

```
## API Reference

### TFM

The main class representing the TFM SDK.

Modules:
- IBC
- Dex Aggregator
- Price

### IBC

The IBC module within the SDK offers a comprehensive set of functionalities for facilitating cross-chain operations. This module seamlessly facilitates transactions between multiple chains, enabling smooth interoperability across various blockchain networks.

It is designed to be highly customizable, offering numerous options to tailor the input and output of operations according to specific needs. Whether you are performing IBC transfers or swaps, the module allows you to choose whether to return the route, message (msg), or both the message and route simultaneously, based on your application's requirements.

### Dex Aggregator

The lib offers the dex aggregator module which allows effortless integration our DEX aggregator into dapps. The SDK seamlessly connects with TFM's API, handling the intricate exchange processes in the background. As a result, developers can avoid the burden of manually implementing these functionalities, saving time and effort.

### Price

While other solutions might provide pricing data from various sources, our library offers a distinctive advantage. It not only enables you to obtain pricing data from diverse channels but also supports pricing retrieval for Inter-Blockchain Communication (IBC) tokens. With this feature, you can effortlessly obtain the price for any IBC token by specifying the destination chain. The integration of this powerful feature enhances the capabilities of your decentralized applications (dApps) significantly, relieving you of any complexities related to pricing retrieval.


## Development

To build the project, run the following command:

```shell
npm run build
```

To run the tests, use:

```shell
npm runt test
```

## Contributing

Contributions are welcome! Please follow the guidelines:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to the branch.
5. Open a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or questions, please contact info@tfm.com

## Changelog

- v0.1.0 (2023-07-07):
  - Initial release of the @tfm/sdk package.
