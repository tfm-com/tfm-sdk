import { Api } from "../api";
import { TFMError } from "../errors";

export class HealthCheckProcessor {
  /**
   * Creates a new instance of the `HealthCheck` class.
   *
   * @param {Api} api - An instance of the `Api` class for making API requests.
   */
  constructor(private readonly api: Api) {}

  /**
   * Checks the health status of the TFM API.
   *
   * @returns {Promise<boolean>} - A Promise that resolves to `true` if the TFM API is healthy and reachable.
   * @throws {TFMError} - If there is an issue with the API call or the response contains an error, indicating that the TFM API is not healthy or unreachable.
   */
  async isHealthy(): Promise<boolean> {
    try {
      await this.api.makeGetRequest("/health");
    } catch (error) {
      throw new TFMError({
        message: "Unable to communicate with TFM API.",
      });
    }
    return true;
  }
}
