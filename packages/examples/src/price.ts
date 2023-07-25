import { TFM } from "@0xtfm/sdk";

async function exec() {
  const sdk = new TFM();

  // initialize the sdk
  await sdk.init();

  console.log('-----------------------------------');
  // get the price of luna in uusd
  const lunaPrice = await sdk.price.getTokenPrice("uluna", "phoenix-1");
  console.log('Price of Luna', lunaPrice?.price);

  // price of osmosis on phoenix-1
  const osmoPrice = await sdk.price.getTokenPrice(
    "ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B",
    "phoenix-1"
  );
  console.log('Price of osmo', osmoPrice.price);


  console.log("-----------------------------------");
}

exec().catch((error) => console.error(error));
