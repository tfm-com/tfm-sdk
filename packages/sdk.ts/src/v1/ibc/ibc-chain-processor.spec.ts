import { Api } from "../../api";
import { IbcChainProcessor } from "./ibc-chain-processor";
import { TFMError } from "../../errors";
import {
  ChainDto,
  IbcTokenDto,
  NetworkType,
  TokenType,
  ChainNetworkType,
  ChainStatus,
} from "./types";

jest.mock("../../api");

describe("IbcChainProcessor", () => {
  let api: Api;
  let ibcChainProcessor: IbcChainProcessor;
  const chain1 = {
    id: 1,
    chainName: "Chain 1",
    prettyName: "Chain 1",
    chainId: "chain1",
    networkType: ChainNetworkType.MAINNET,
    status: ChainStatus.ENABLED,
    githubUrl: "",
    isTrading: true,
    imageUrl: "",
    isPfmEnabled: true,
    isWasmHookEnabled: true,
  };

  const chain2 = {
    id: 2,
    chainName: "Chain 2",
    prettyName: "Chain 2",
    chainId: "chain2",
    networkType: ChainNetworkType.MAINNET,
    status: ChainStatus.ENABLED,
    githubUrl: "",
    isTrading: true,
    imageUrl: "",
    isPfmEnabled: true,
    isWasmHookEnabled: true,
  };
  let chains: ChainDto[];

  const token1: IbcTokenDto = {
    name: "Token 1",
    symbol: "TKN1",
    contractAddr: "token1",
    decimals: 6,
    numberOfPools: 1,
    imageUrl: "",
    isTrading: true,
  };

  const token2: IbcTokenDto = {
    name: "Token 2",
    symbol: "TKN2",
    contractAddr: "token2",
    decimals: 6,
    numberOfPools: 2,
    imageUrl: "",
    isTrading: true,
  };

  const tokens = [token1, token2];

  beforeEach(() => {
    api = new Api("example.test");
    ibcChainProcessor = new IbcChainProcessor(api);
    chains = [chain1, chain2];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an instance of IbcChainProcessor", () => {
    expect(ibcChainProcessor).toBeInstanceOf(IbcChainProcessor);
  });

  it("getAllChains should make a GET request with the correct URL and return an array of ChainDto", async () => {
    api.makeGetRequest = jest.fn().mockResolvedValue(chains);

    const result = await ibcChainProcessor.getAllChains({
      isTrading: true,
      networkType: NetworkType.Mainnet,
    });

    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/chain?isTrading=true&networkType=mainnet",
    );
    expect(result).toEqual(chains);
  });

  it("getAllChainTokens should make a GET request with the correct URL and return an array of IbcTokenDto", async () => {
    const chainId = "chain123";
    api.makeGetRequest = jest.fn().mockResolvedValue(tokens);

    const result = await ibcChainProcessor.getAllChainTokens(chainId, {
      isTrading: true,
      tokenType: TokenType.Native,
    });

    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/chain/chain123/tokens?isTrading=true&tokenType=native",
    );
    expect(result).toEqual(tokens);
  });

  it("getChainToken should make a GET request with the correct URL and return an IbcTokenDto", async () => {
    const chainId = "chain123";
    const denom = "token123";
    api.makeGetRequest = jest.fn().mockResolvedValue(token1);

    const result = await ibcChainProcessor.getChainToken({ chainId, denom });

    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/chain/chain123/token/token123",
    );
    expect(result).toEqual(token1);
  });

  it("getAllReachableChains should make a GET request with the correct URL and return an array of ChainDto", async () => {
    const chainId = "chain123";
    const reachableChains = [chain2];
    api.makeGetRequest = jest.fn().mockResolvedValue(reachableChains);

    const result = await ibcChainProcessor.getAllReachableChains(chainId);

    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/chain/chain123/reachable-chains",
    );
    expect(result).toEqual(reachableChains);
  });

  it("chainIsReachable should make a GET request with the correct URL and return a ChainReachableDto", async () => {
    const sourceChainId = "chain1";
    const destinationChainId = "chain2";
    const chainReachableData = {
      sourceChainId,
      destinationChainId,
      reachable: true,
    };
    api.makeGetRequest = jest.fn().mockResolvedValue(chainReachableData);

    const result = await ibcChainProcessor.chainIsReachable(
      sourceChainId,
      destinationChainId,
    );

    expect(api.makeGetRequest).toHaveBeenCalledWith(
      "/ibc/chain/chain1/reachable-chain/chain2",
    );
    expect(result).toEqual(chainReachableData);
  });

  it("getAllTransferableTokens should throw TFMError if sourceChainId and destinationChainId are the same", async () => {
    const sourceChainId = "chain1";
    const destinationChainId = "chain1";

    await expect(
      ibcChainProcessor.getAllTransferableTokens(
        sourceChainId,
        destinationChainId,
      ),
    ).rejects.toThrow(TFMError);
  });

  it("tokenIsTransferable should throw TFMError if sourceChainId and destinationChainId are the same", async () => {
    const sourceChainId = "chain1";
    const destinationChainId = "chain1";
    const denom = "token1";

    await expect(
      ibcChainProcessor.tokenIsTransferable(
        sourceChainId,
        destinationChainId,
        denom,
      ),
    ).rejects.toThrow(TFMError);
  });
});
