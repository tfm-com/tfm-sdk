import { SwapMode, TFM } from "@0xtfm/sdk";

async function exec() {
  const sdk = new TFM();

  // initialize the sdk
  await sdk.init();

  console.log("------------------------------------");
  // get ibc swap route from terra2 to osmosis using turbo mode
  const ibcSwapRouteTerrToOsmsis = await sdk.ibc.swap.getSwapRoute({
    sourceChainId: "phoenix-1",
    destinationChainId: "osmosis-1",
    sourceDenom: "uluna",
    destinationDenom: "uosmo",
    amount: "1000",
    swapMode: SwapMode.Turbo,
  });
  console.log(
    "ibc swap route from terra2 to osmosis for swapping luna for osmosis",
    ibcSwapRouteTerrToOsmsis
  );

  console.log("------------------------------------");
  // get ibc swap msg from terra2 to osmosis for swapping luna using turbo mode
  const ibcSwapMsgTerrToOsmsis = await sdk.ibc.swap.getSwapMsg({
    sourceChainId: "phoenix-1",
    destinationChainId: "osmosis-1",
    sourceDenom: "uluna",
    destinationDenom: "uosmo",
    amount: "1000",
    swapMode: SwapMode.Turbo,
  });
  console.log(
    "ibc swap msg from terra2 to osmosis for swapping luna for osmo",
    ibcSwapMsgTerrToOsmsis
  );

  // get ibc swap msg and route from terra2 to osmosis using turbo mode
  const ibcSwapMsgAndRouteTerraToOsmsis =
    await sdk.ibc.swap.getSwapRouteMsgCombined({
      sourceChainId: "phoenix-1",
      destinationChainId: "osmosis-1",
      sourceDenom: "uluna",
      destinationDenom: "uosmo",
      amount: "1000",
      swapMode: SwapMode.Turbo,
    });
  console.log(
    "ibc swap return route msg together",
    ibcSwapMsgAndRouteTerraToOsmsis
  );

  // in order to change to saving mode just need to change t
  // the mode from turbo to saving
  // by default Turbo mode is enabled

  // get ibc swap msg and route from terra2 to osmosis using saving mode
  const ibcSwapMsgAndRouteTerraToOsmsisSaving =
    await sdk.ibc.swap.getSwapRouteMsgCombined({
      sourceChainId: "phoenix-1",
      destinationChainId: "osmosis-1",
      sourceDenom: "uluna",
      destinationDenom: "uosmo",
      amount: "1000",
      swapMode: SwapMode.Saving,
    });
  console.log(
    "ibc swap return route msg together in saving mode",
    ibcSwapMsgAndRouteTerraToOsmsisSaving
  );
}

exec().catch((error) => console.error(error));
