# Examples

This package contains a set of examples for the SDK. It provides a examples for most of the functionalities in the sdk.

## Requirements

Before using this package, ensure that you have the following installed:

- Node.js version 16 or higher

## How to Use

To use this package, follow the steps below:

1. Clone the Repository
   Clone the TFM SDK repository to your local machine:

   ```bash
   git clone <https://github.com/your-scope/tfm-sdk.git>
   ```

2. Install the Package
   From the root of your TFM SDK Workspace, install the package using npm:

   ```bash
   npm install
   ```

3. Build the Package
   After installation, build the TFM SDK package using the following command:

   ```bash
   npx nx build @0xtfm/sdk
   ```

Usage

Before running the examples, build them if any changes are made to ensure they are up-to-date:

```bash
npx nx build @0xtfm/examples
```

Now, you can run each example using the provided commands:

```bash
npx nx examples:basic
npx nx examples:price
npx nx examples:dex
npx nx examples:ibc-chain
npx nx examples:ibc-transfer
npx nx examples:ibc-swap
```

If you make any changes to the examples, rebuild them before running the commands again.

Getting Help

For any issues or questions related to this package, feel free to open an issue on the GitHub repository.

Contribution

We welcome contributions from the community! If you find a bug, have an improvement idea, or want to add new features to the package, please submit a pull request.

License

This package is distributed under the MIT License.
