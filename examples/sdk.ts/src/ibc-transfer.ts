import { TFM } from "@0xtfm/sdk";

async function exec() {
  const sdk = new TFM();

  // initialize the sdk
  await sdk.init();

  console.log('------------------------------------');
  // get ibc transfer route from terra2 to osmosis
  const ibcTransferRouteTerrToOsmsis = await sdk.ibc.transfer.getTransferRoute({
    sourceChainId: "phoenix-1",
    destinationChainId: "osmosis-1",
    sourceDenom: "uluna",
    destinationDenom:
      "ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",
    amount: "1000",
  });
  console.log("ibc transfer route from terra2 to osmosis for transferring luna", 
    ibcTransferRouteTerrToOsmsis);

  console.log('------------------------------------');
  // get ibc transfer msg from terra2 to osmosis
  const ibcTransferMsgTerrToOsmsis = await sdk.ibc.transfer.getTransferMsg({
    sourceChainId: "phoenix-1",
    destinationChainId: "osmosis-1",
    sourceDenom: "uluna",
    destinationDenom:
      "ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",
    amount: "1000",
  });
  console.log(
    "ibc transfer msg from terra2 to osmosis for transferring luna",
    ibcTransferMsgTerrToOsmsis
  );

  // get ibc transfer msg and route from terra2 to osmosis
  const ibcTransferMsgAndRouteTerraToOsmsis =
    await sdk.ibc.transfer.getTransferRouteMsgCombined({
      sourceChainId: "phoenix-1",
      destinationChainId: "osmosis-1",
      sourceDenom: "uluna",
      destinationDenom:
        "ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",
      amount: "1000",
    });
  console.log("ibc transfer return route msg together", ibcTransferMsgAndRouteTerraToOsmsis);
}

exec().catch((error) => console.error(error));
