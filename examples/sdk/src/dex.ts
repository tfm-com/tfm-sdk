import { TFM } from "@0xtfm/sdk";

async function exec() {
  const sdk = new TFM();

  // initialize the sdk
  await sdk.init();

  // swap route from luna to astro
  const swapRouteFromLunaToAstro = await sdk.dex.getRoute({
    chainId: "phoenix-1",
    sourceDenom: "uluna",
    destinationDenom:
      "terra1nsuqsk6kh58ulczatwev87ttq2z6r3pusulg9r24mfj2fvtzd4uq3exn26",
    amount: 1000,
  });
  console.log("-----------------------------------");
  console.log('Route to swap Luna to Astro', swapRouteFromLunaToAstro);

  // swap msg from luna to astro
  const swapMsgLunaToAstro = await sdk.dex.getMsg({
    chainId: "phoenix-1",
    sourceDenom: "uluna",
    destinationDenom:
      "terra1nsuqsk6kh58ulczatwev87ttq2z6r3pusulg9r24mfj2fvtzd4uq3exn26",
    amount: 1000,
  });
  console.log("-----------------------------------");
  console.log("Message to swap Luna to Astro", JSON.parse(JSON.stringify(swapMsgLunaToAstro)));

}

exec().catch((error) => console.error(error));
