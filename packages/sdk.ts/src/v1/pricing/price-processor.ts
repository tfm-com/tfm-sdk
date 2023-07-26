import { Api } from "../../api";
import { Price } from "../../types";

export class PriceProcessor {
  /**
   * Creates a new instance of the `Prices` class.
   * @param api An instance of the `Api` class for making API requests.
   */
  constructor(private readonly api: Api) {}

  /**
   * Retrieves the price of a specific token at a given timestamp from the API.
   *
   * @param {string} denom - The denomination of the token (e.g., currency, cryptocurrency).
   * @param {string} chainId - The identifier of the blockchain chain for which the token price is requested.
   * @param {number} timestamp - (Optional) The timestamp for which the price is needed. If provided, the function fetches the token price at that specific time; otherwise, it fetches the latest available price.
   * @returns {Promise<Price>} - A Promise that resolves to the token price represented by the `Price` type. If the price is not available, an empty `Price` object is returned.
   *
   * @throws {TFMApiError} - If there is an issue with the API call or the response contains an error.
   * */
  async getTokenPrice(
    denom: string,
    chainId: string,
    timestamp?: number,
  ): Promise<Price> {
    let url = `/price/${chainId}/${encodeURIComponent(denom)}`;
    if (timestamp) {
      url = `${url}?timestamp=${timestamp}`;
    }
    return await this.api.makeGetRequest<Price>(url);
  }
}
