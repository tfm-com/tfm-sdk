import { TFM } from "@0xtfm/sdk";

async function exec() {
  const sdk = new TFM();

  // initialize the sdk
  await sdk.init();

  // get the price of luna in uusd
  const lunaPrice = await sdk.price.getTokenPrice("uluna", "phoenix-1");
  console.log(lunaPrice);
}

exec().catch((error) => console.error(error));
