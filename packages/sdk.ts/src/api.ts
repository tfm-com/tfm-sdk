import { create } from "apisauce";
import { TFMApiError } from "./errors";
import { TFMApiErrorResponse, TFMApiResponse } from "./types";

// response from api
export type TFMApiErrorResponseType = {
  error?: {
    message: string;
  };
};
/**
 * Represents an API client.
 */
export class Api {
  api;

  /**
   * Creates an instance of the Api client.
   *
   * @param baseURL - The base URL of the API.
   */
  constructor(baseURL: string, timeout = 10000) {
    this.api = create({
      baseURL,
      headers: { Accept: "application/json" },
      timeout,
    });
  }

  /**
   * Makes a GET request to the specified path with the provided params.
   *
   * @param path - The path of the endpoint to make the request to.
   * @param params - The params to be sent as query parameters in the request.
   * @returns A Promise that resolves to the API response.
   */
  async makeGetRequest<T>(path: string, params: any = {}): Promise<T> {
    const resp: TFMApiResponse<T> = await this.api.get<T>(path, params);

    if (resp.ok && resp.data) {
      return resp.data;
    }

    let message = "Unable to complete the request.";

    const data: TFMApiErrorResponseType = resp.data as TFMApiErrorResponseType;
    message = data?.error?.message || message;

    return Promise.reject(
      new TFMApiError({
        message,
        apiResponseError: resp as TFMApiErrorResponse,
      }),
    );
  }

  getBaseURL(): string {
    return this.api.getBaseURL();
  }

  updateBaseURL(baseURL: string): void {
    this.api.setBaseURL(baseURL);
  }

  updateTimeout(timeout = 10000): void {
    this.api.axiosInstance.defaults.timeout = timeout;
  }
}
