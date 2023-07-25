import { Api } from "../api";
import { TFMError } from "../errors";
import { HealthCheckProcessor } from "./health-check.processor";

jest.mock("../api");
const mockedApi = new Api("example.com") as jest.Mocked<Api>;

describe("HealthCheckProcessor", () => {
  let healthCheckProcessor: HealthCheckProcessor;

  beforeEach(() => {
    healthCheckProcessor = new HealthCheckProcessor(mockedApi);
  });

  afterEach(() => {
    mockedApi.makeGetRequest.mockClear();
  });

  it("should resolve with true when the TFM API is healthy", async () => {
    mockedApi.makeGetRequest.mockResolvedValueOnce({ status: "healthy" });

    await expect(healthCheckProcessor.isHealthy()).resolves.toBe(true);
    expect(mockedApi.makeGetRequest).toHaveBeenCalledWith("/health");
  });

  it("should throw a TFMError when the TFM API is not healthy", async () => {
    mockedApi.makeGetRequest.mockRejectedValueOnce(
      new Error("API not reachable"),
    );

    await expect(healthCheckProcessor.isHealthy()).rejects.toThrow(TFMError);

    expect(mockedApi.makeGetRequest).toHaveBeenCalledWith("/health");
  });
});
