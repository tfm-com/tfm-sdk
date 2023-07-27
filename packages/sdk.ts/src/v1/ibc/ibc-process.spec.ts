import { Api } from "../../api";
import { IbcProcessor } from "./ibc-processor";
import {
  IbcChainProcessor,
  IbcSwapProcessor,
  IbcTransferProcessor,
} from "./types";

jest.mock("../../api");

describe("IbcProcessor", () => {
  let api: Api;
  let ibcProcessor: IbcProcessor;

  beforeEach(() => {
    api = new Api("example.com");
    ibcProcessor = new IbcProcessor(api);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an instance of IbcProcessor", () => {
    expect(ibcProcessor).toBeInstanceOf(IbcProcessor);
  });

  it("should have instances of IbcChainProcessor, IbcTransferProcessor, and IbcSwapProcessor", () => {
    expect(ibcProcessor.chain).toBeInstanceOf(IbcChainProcessor);
    expect(ibcProcessor.transfer).toBeInstanceOf(IbcTransferProcessor);
    expect(ibcProcessor.swap).toBeInstanceOf(IbcSwapProcessor);
  });
});
