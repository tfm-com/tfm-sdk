import { Api } from "../../api";
import { TFMError } from "../../errors";
import { Price } from "../../types";
import { PriceProcessor } from "./price-processor";

jest.mock("../../api");

describe("PriceProcessor", () => {
  let prices: PriceProcessor;
  let api: jest.Mocked<Api>;

  beforeEach(() => {
    api = new Api("example.com") as jest.Mocked<Api>;
    prices = new PriceProcessor(api);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch token price for a given chain and denomination", async () => {
    const expectedDenom = "uluna";
    const expectedChainId = "chain1";
    const expectedPriceData: Price = {
      price: 1000,
      asset: {
        symbol: "abc",
        name: "ABC",
        base: "abc",
      },
      requestDenom: "abc",
    };

    api.makeGetRequest.mockResolvedValue(expectedPriceData);

    const result = await prices.getTokenPrice(expectedDenom, expectedChainId);

    expect(result).toEqual(expectedPriceData);
    expect(api.makeGetRequest).toHaveBeenCalledWith("/price/chain1/uluna");
  });

  test("should throw an error when the API response does not contain data", async () => {
    const expectedDenom = "uluna";
    const expectedChainId = "phoenix-1";

    api.makeGetRequest.mockRejectedValue(
      new TFMError({
        message: "Unable to complete the request.",
      }),
    );

    try {
      await prices.getTokenPrice(expectedDenom, expectedChainId);

      expect(true).toBe(false);
    } catch (error: TFMError | any) {
      expect(error).toBeInstanceOf(TFMError);
      expect(error.message).toContain("Unable to complete the request.");
    }
  });
});
