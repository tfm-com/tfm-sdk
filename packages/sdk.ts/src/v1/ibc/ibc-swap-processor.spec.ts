import { Api } from "../../api";
import { IbcSwapProcessor } from "./ibc-swap-processor";
import { SwapMode } from "./enums";
import {
  validateSourceAndDestinationChain,
  validateSourceAndDestinationDenom,
} from "./validation";

jest.mock("../../api");
jest.mock("./validation");

describe("IbcSwapProcessor", () => {
  let api: Api;
  let ibcSwapProcessor: IbcSwapProcessor;

  beforeEach(() => {
    api = new Api("example.test");
    ibcSwapProcessor = new IbcSwapProcessor(api);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an instance of IbcSwapProcessor", () => {
    expect(ibcSwapProcessor).toBeInstanceOf(IbcSwapProcessor);
  });

  it("getSwapRoute should make a GET request with the correct URL and return a SwapRouteDto", async () => {
    const routeData = {};
    api.makeGetRequest = jest.fn().mockResolvedValue(routeData);

    const result = await ibcSwapProcessor.getSwapRoute({
      sourceChainId: "chain1",
      destinationChainId: "chain2",
      sourceDenom: "token1",
      destinationDenom: "token2",
      amount: 100,
      swapMode: SwapMode.Turbo,
    });

    expect(validateSourceAndDestinationChain).toHaveBeenCalledWith(
      "chain1",
      "chain2",
    );
    expect(validateSourceAndDestinationDenom).toHaveBeenCalledWith(
      "token1",
      "token2",
    );
    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/swap/route/chain1/chain2/token1/token2/100?swapMode=Turbo",
    );
    expect(result).toEqual(routeData);
  });

  it("getSwapMsg should make a GET request with the correct URL and return a SwapMsgDto", async () => {
    const msgData = {};
    api.makeGetRequest = jest.fn().mockResolvedValue(msgData);

    const result = await ibcSwapProcessor.getSwapMsg({
      sourceChainId: "chain1",
      destinationChainId: "chain2",
      sourceDenom: "token1",
      destinationDenom: "token2",
      amount: 100,
      swapMode: SwapMode.Turbo,
      pfmEnabled: true,
      slippage: 0.01,
    });

    expect(validateSourceAndDestinationChain).toHaveBeenCalledWith(
      "chain1",
      "chain2",
    );
    expect(validateSourceAndDestinationDenom).toHaveBeenCalledWith(
      "token1",
      "token2",
    );
    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/swap/msg/chain1/chain2/token1/token2/100?swapMode=Turbo&pfmEnabled=true&slippage=0.01",
    );
    expect(result).toEqual(msgData);
  });

  it("getSwapRouteMsgCombined should make a GET request with the correct URL and return a RouteMsgCombinedSwapDto", async () => {
    const routeMsgCombinedData = {};
    api.makeGetRequest = jest.fn().mockResolvedValue(routeMsgCombinedData);

    const result = await ibcSwapProcessor.getSwapRouteMsgCombined({
      sourceChainId: "chain1",
      destinationChainId: "chain2",
      sourceDenom: "token1",
      destinationDenom: "token2",
      amount: 100,
      swapMode: SwapMode.Turbo,
      slippage: 0.01,
      pfmEnabled: true,
    });

    expect(validateSourceAndDestinationChain).toHaveBeenCalledWith(
      "chain1",
      "chain2",
    );
    expect(validateSourceAndDestinationDenom).toHaveBeenCalledWith(
      "token1",
      "token2",
    );
    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/swap/route-msg-combined/chain1/chain2/token1/token2/100?swapMode=Turbo&pfmEnabled=true&slippage=0.01",
    );
    expect(result).toEqual(routeMsgCombinedData);
  });
});
