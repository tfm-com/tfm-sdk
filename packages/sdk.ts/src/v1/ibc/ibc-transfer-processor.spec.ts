import { Api } from "../../api";
import { IbcTransferProcessor } from "./ibc-transfer-processor";
import {
  validateOneOfDenomsShouldBeIBc,
  validateSourceAndDestinationChain,
  validateSourceAndDestinationDenom,
} from "./validation";

jest.mock("../../api");
jest.mock("./validation");

describe("IbcTransferProcessor", () => {
  let api: Api;
  let ibcTransferProcessor: IbcTransferProcessor;

  beforeEach(() => {
    api = new Api("example.test");
    ibcTransferProcessor = new IbcTransferProcessor(api);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create an instance of IbcTransferProcessor", () => {
    expect(ibcTransferProcessor).toBeInstanceOf(IbcTransferProcessor);
  });

  test("getTransferRoute should make a GET request with the correct URL and return a TransferRouteDto", async () => {
    const routeData = {};
    api.makeGetRequest = jest.fn().mockResolvedValue(routeData);

    const result = await ibcTransferProcessor.getTransferRoute({
      sourceChainId: "chain1",
      destinationChainId: "chain2",
      sourceDenom: "token1",
      destinationDenom: "token2",
      amount: "100",
    });

    expect(validateSourceAndDestinationChain).toHaveBeenCalledWith(
      "chain1",
      "chain2",
    );
    expect(validateSourceAndDestinationDenom).toHaveBeenCalledWith(
      "token1",
      "token2",
    );
    expect(validateOneOfDenomsShouldBeIBc).toHaveBeenCalledWith(
      "token1",
      "token2",
    );
    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/transfer/route/chain1/chain2/token1/token2/100",
    );
    expect(result).toEqual(routeData);
  });

  test("getTransferMsg should make a GET request with the correct URL and return a TransferMsgDto", async () => {
    const msgData = {};
    api.makeGetRequest = jest.fn().mockResolvedValue(msgData);

    const result = await ibcTransferProcessor.getTransferMsg({
      sourceChainId: "chain1",
      destinationChainId: "chain2",
      sourceDenom: "token1",
      destinationDenom: "token2",
      amount: "100",
    });

    expect(validateSourceAndDestinationChain).toHaveBeenCalledWith(
      "chain1",
      "chain2",
    );
    expect(validateSourceAndDestinationDenom).toHaveBeenCalledWith(
      "token1",
      "token2",
    );
    expect(validateOneOfDenomsShouldBeIBc).toHaveBeenCalledWith(
      "token1",
      "token2",
    );
    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/transfer/msg/chain1/chain2/token1/token2/100",
    );
    expect(result).toEqual(msgData);
  });

  test("getTransferRouteMsgCombined should make a GET request with the correct URL and return a RouteMsgCombinedTransferDto", async () => {
    const routeMsgCombinedData = {};
    api.makeGetRequest = jest.fn().mockResolvedValue(routeMsgCombinedData);

    const result = await ibcTransferProcessor.getTransferRouteMsgCombined({
      sourceChainId: "chain1",
      destinationChainId: "chain2",
      sourceDenom: "token1",
      destinationDenom: "token2",
      amount: "100",
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
    expect(validateOneOfDenomsShouldBeIBc).toHaveBeenCalledWith(
      "token1",
      "token2",
    );
    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/transfer/route-msg-combined/chain1/chain2/token1/token2/100?pfmEnabled=true",
    );
    expect(result).toEqual(routeMsgCombinedData);
  });
});
