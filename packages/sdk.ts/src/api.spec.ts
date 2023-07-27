import { create } from "apisauce";
import { Api } from "./api";
import { TFMApiError } from "./errors";
import { TFMApiErrorResponse } from "./types";

jest.mock("apisauce");

describe("Api", () => {
  const baseURL = "https://api.example.com";
  let api: Api;
  let apiInstance: any;

  beforeEach(() => {
    apiInstance = {
      get: jest.fn(),
      setBaseURL: jest.fn(),
      axiosInstance: {
        defaults: {
          timeout: 10000,
        },
      },
    };
    (create as jest.Mock).mockReturnValue(apiInstance);
    api = new Api(baseURL);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("makeGetRequest", () => {
    it("should make a GET request with the provided params", async () => {
      const path = "/test";
      const params = {
        key1: "value1",
        key2: "value2",
      };

      const responseData = { data: "response data" };
      const expectedResponse = { ok: true, data: responseData };

      apiInstance.get.mockResolvedValueOnce(expectedResponse);

      const result = await api.makeGetRequest<{ data: string }>(path, params);

      expect(apiInstance.get).toHaveBeenCalledWith(path, params);
      expect(result).toEqual(responseData);
    });

    it("should make a GET request with empty params if none are provided", async () => {
      const path = "/test";

      const responseData = { data: "response data" };
      const expectedResponse = { ok: true, data: responseData };

      apiInstance.get.mockResolvedValueOnce(expectedResponse);

      const result = await api.makeGetRequest<{ data: string }>(path);

      expect(apiInstance.get).toHaveBeenCalledWith(path, {});
      expect(result).toEqual(responseData);
    });

    it("should reject the promise with a TFMApiError if the API response does not contain data", async () => {
      const path = "/test";
      const params = {
        key1: "value1",
        key2: "value2",
      };

      const expectedResponse = { ok: true, data: undefined };

      apiInstance.get.mockResolvedValueOnce(expectedResponse);

      await expect(
        api.makeGetRequest<{ data: string }>(path, params),
      ).rejects.toThrowError(TFMApiError);
      expect(apiInstance.get).toHaveBeenCalledWith(path, params);
    });

    it("should reject the promise with a TFMApiError on unsuccessful response", async () => {
      const path = "/test";
      const params = {
        key1: "value1",
        key2: "value2",
      };

      const message = "Request failed with status code 404";
      const apiErrorResponse: TFMApiErrorResponse = {
        problem: "CLIENT_ERROR",
        originalError: {
          name: "Error",
          message: message,
          isAxiosError: true,
          toJSON: jest.fn(),
        },
        data: {
          error: message,
        },
        ok: false,
      };

      const expectedResponse = { ...apiErrorResponse };

      apiInstance.get.mockResolvedValueOnce(expectedResponse);

      await expect(
        api.makeGetRequest<{ data: string }>(path, params),
      ).rejects.toThrowError(TFMApiError);
      expect(apiInstance.get).toHaveBeenCalledWith(path, params);
    });
  });

  describe("updateBaseURL", () => {
    it("should update the base URL of the API instance", () => {
      const newBaseURL = "https://api.newexample.com";
      api.updateBaseURL(newBaseURL);

      expect(apiInstance.setBaseURL).toHaveBeenCalledWith(newBaseURL);
    });
  });

  describe("updateTimeout", () => {
    it("should update the timeout value for the API instance", () => {
      const newTimeout = 20000;
      api.updateTimeout(newTimeout);

      expect(apiInstance.axiosInstance.defaults.timeout).toBe(newTimeout);
    });

    it("should update the timeout value with the default if no timeout is provided", () => {
      api.updateTimeout();

      expect(apiInstance.axiosInstance.defaults.timeout).toBe(10000); // Default value
    });
  });
});
