import { Api } from "../../api";
import { DexProcessor } from "./dex-processor";
import { GetMsgDto } from "./dto/get-msg.dto";
import { GetRouteDto } from "./dto/get-route.dto";
import { MsgDto } from "./dto/msg.dto";
import { RouteDto } from "./dto/route.dto";
import { TFMApiError } from "../../errors";

jest.mock("../../api");

describe("DexProcessor", () => {
  let dexProcessor: DexProcessor;
  let api: jest.Mocked<Api>;

  const baseUrl = "example.com";

  beforeEach(() => {
    api = new Api(baseUrl) as jest.Mocked<Api>;
    dexProcessor = new DexProcessor(api);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRoute", () => {
    const mockResponse: RouteDto = {} as RouteDto;

    it("should fetch route successfully", async () => {
      // Mock the successful API response
      api.makeGetRequest.mockResolvedValue({} as RouteDto);

      // Mock the input parameters for the getRoute method
      const getRouteDto: GetRouteDto = {
        chainId: "chain1",
        sourceDenom: "usdt",
        destinationDenom: "busd",
        amount: "100",
      };

      // Call the getRoute method
      const result = await dexProcessor.getRoute(getRouteDto);

      // Expect the result to match the mock response data
      expect(result).toEqual(mockResponse);

      // Expect the makeGetRequest function to be called with the correct URL
      const expectedUrl = `/dex-aggregator/route/${getRouteDto.chainId}/${getRouteDto.sourceDenom}/${getRouteDto.destinationDenom}/${getRouteDto.amount}`;
      expect(api.makeGetRequest).toHaveBeenCalledWith(expectedUrl);
    });

    it("should throw a TFMApiError on API error", async () => {
      const mockErrorResponse: TFMApiError = new TFMApiError({
        message: "Network Error",
        apiResponseError: {
          problem: "NETWORK_ERROR",
          originalError: {
            name: "Error",
            message: "Network Error",
            isAxiosError: true,
            toJSON: jest.fn(),
          },
          ok: false,
          status: 500,
          data: undefined,
        },
      });

      // Mock the API error response
      api.makeGetRequest.mockRejectedValue(mockErrorResponse);

      // Mock the input parameters for the getRoute method
      const getRouteDto: GetRouteDto = {
        chainId: "chain1",
        sourceDenom: "usdt",
        destinationDenom: "busd",
        amount: "100",
      };

      // Expect the getRoute method to throw a TFMApiError with the correct message
      await expect(dexProcessor.getRoute(getRouteDto)).rejects.toThrow(
        TFMApiError,
      );

      // Expect the makeGetRequest function to be called with the correct URL
      const expectedUrl = `/dex-aggregator/route/${getRouteDto.chainId}/${getRouteDto.sourceDenom}/${getRouteDto.destinationDenom}/${getRouteDto.amount}`;
      expect(api.makeGetRequest).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe("getMsg", () => {
    const mockResponse: MsgDto = {} as MsgDto;

    it("should fetch msg successfully", async () => {
      // Mock the successful API response
      api.makeGetRequest.mockResolvedValue({} as MsgDto);

      // Mock the input parameters for the getMsg method
      const getMsgDto: GetMsgDto = {
        chainId: "chain1",
        sourceDenom: "usdt",
        destinationDenom: "busd",
        amount: "100",
        slippage: 0.5,
      };

      const result = await dexProcessor.getMsg(getMsgDto);

      expect(result).toEqual(mockResponse);

      const expectedUrl = `/dex-aggregator/msg/${getMsgDto.chainId}/${getMsgDto.sourceDenom}/${getMsgDto.destinationDenom}/${getMsgDto.amount}?slippage=${getMsgDto.slippage}`;
      expect(api.makeGetRequest).toHaveBeenCalledWith(expectedUrl);
    });

    it("should throw a TFMApiError on API error", async () => {
      const mockErrorResponse: TFMApiError = new TFMApiError({
        message: "Network Error",
        apiResponseError: {
          problem: "NETWORK_ERROR",
          originalError: {
            name: "Error",
            message: "Network Error",
            isAxiosError: true,
            toJSON: jest.fn(),
          },
          ok: false,
          status: 500,
          data: undefined,
        },
      });

      api.makeGetRequest.mockRejectedValue(mockErrorResponse);

      // Mock the input parameters for the getMsg method
      const getMsgDto: GetMsgDto = {
        chainId: "chain1",
        sourceDenom: "usdt",
        destinationDenom: "busd",
        amount: "100",
        slippage: 0.5,
      };

      // Expect the getMsg method to throw a TFMApiError with the correct message
      await expect(dexProcessor.getMsg(getMsgDto)).rejects.toThrow(TFMApiError);

      // Expect the makeGetRequest function to be called with the correct URL
      const expectedUrl = `/dex-aggregator/msg/${getMsgDto.chainId}/${getMsgDto.sourceDenom}/${getMsgDto.destinationDenom}/${getMsgDto.amount}?slippage=${getMsgDto.slippage}`;
      expect(api.makeGetRequest).toHaveBeenCalledWith(expectedUrl);
    });
  });
});
