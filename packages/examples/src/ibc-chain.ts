import { TFM } from "@0xtfm/sdk";

async function exec() {
  const sdk = new TFM();

  // initialize the sdk
  await sdk.init();

  console.log("-----------------------------------");
  // get chains on ibc
  const chains = await sdk.ibc.chain.getAllChains();
  console.log("List of chains(sample):", chains.slice(0, 5));
  console.log("Total number of chains:", chains.length);

  console.log("-----------------------------------");

  // get tokens for a chain
  const terra2Tokens = await sdk.ibc.chain.getAllChainTokens("phoenix-1");
  console.log("Token on terra(sample):", terra2Tokens.slice(0, 5));
  console.log("Total number of tokens on terra:", terra2Tokens.length);

  console.log("-----------------------------------");
  // get token info
  const tokenInfo = await sdk.ibc.chain.getChainToken({
    chainId: "phoenix-1",
    denom: "uluna",
  });
  console.log("Token info for uluna", tokenInfo);

  console.log("-----------------------------------");
  // Get reachable chains from chain X for example Terra
  const reachableChains = await sdk.ibc.chain.getAllReachableChains(
    "phoenix-1"
  );
  console.log(
    "Reachable chains from terra(sample):",
    reachableChains.slice(0, 5)
  );

  console.log("-----------------------------------");
  // Check if chain X is reachable from chain Y
  const isReachable = await sdk.ibc.chain.chainIsReachable("phoenix-1", "osmosis-1");
  console.log("Is osmosis reachable from terra:", isReachable);

  console.log("-----------------------------------");
  // Get transferable tokens between two chains
  const transferableTokens = await sdk.ibc.chain.getAllTransferableTokens(
    "phoenix-1",
    "osmosis-1"
  );
  console.log(
    "Transferable tokens between terra and osmosis(sample):",
    transferableTokens.slice(0, 5)
  );

  console.log("-----------------------------------");
  // Check if token X is transferable from chain X to chain Y
  const tokenIsTransferable = await sdk.ibc.chain.tokenIsTransferable(
    "phoenix-1",
    "osmosis-1",
    "uluna"
  );
  console.log("Is uluna transferable from terra to osmosis:", tokenIsTransferable);
}
exec().catch((error) => console.error(error));
