import { Client } from "./client";
import { Api } from "./api";
import { HealthCheck } from "./health-check";
import { TFMError } from "./errors";

// Mock the Api class to simulate API requests
jest.mock("./api");
const mockedApi = new Api("example.com") as jest.Mocked<Api>;

// Mock the HealthCheck class to isolate its behavior
jest.mock("./health-check");
const mockedHealthCheck = HealthCheck as jest.MockedClass<typeof HealthCheck>;

describe("Client", () => {
  let client: Client;

  beforeEach(() => {
    // Create a new instance of the Client before each test
    client = new Client();

    // Mock the console.log method
    jest.spyOn(console, "log").mockImplementation(() => {
      return "";
    });
  });

  afterEach(() => {
    // Clear all mock calls after each test
    mockedApi.makeGetRequest.mockClear();
    mockedHealthCheck.mockClear();
    jest.restoreAllMocks(); // Restore the console.log method after each test
  });

  it("should initialize the TFM client", async () => {
    // Mock the successful health check
    const healthCheckInstance = new HealthCheck(mockedApi);
    mockedHealthCheck.mockImplementation(() => healthCheckInstance);
    jest.spyOn(healthCheckInstance, "isHealthy").mockResolvedValueOnce(true);

    // Call the init method and expect it to resolve without errors
    await expect(client.init()).resolves.not.toThrow();

    // Ensure that the HealthCheck class is initialized with the correct Api instance
    expect(mockedHealthCheck).toHaveBeenCalledWith(mockedApi);

    // Ensure that the checkInitialized method works correctly
    expect(() => client.price).not.toThrow(TFMError);
    expect(() => client.dex).not.toThrow(TFMError);
    expect(() => client.ibc).not.toThrow(TFMError);
  });

  it("should throw an error when trying to access properties before initialization", () => {
    // Access the properties (price, dex, ibc) before initialization and expect them to throw an error
    expect(() => client.price).toThrow(TFMError);
    expect(() => client.dex).toThrow(TFMError);
    expect(() => client.ibc).toThrow(TFMError);
  });

  it("should call the isHealthy() method from HealthCheck during initialization", async () => {
    // Mock the isHealthy method of HealthCheck to resolve without throwing an error
    const healthCheckInstance = new HealthCheck(mockedApi);
    mockedHealthCheck.mockImplementation(() => healthCheckInstance);
    jest.spyOn(healthCheckInstance, "isHealthy").mockResolvedValueOnce(true);

    // Call the init method
    await client.init();

    // Ensure that the isHealthy method was called once
    expect(healthCheckInstance.isHealthy).toHaveBeenCalledTimes(1);
  });

  // Add more test cases to cover other scenarios if needed
});
