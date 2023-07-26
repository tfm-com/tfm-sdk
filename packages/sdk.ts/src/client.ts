import { Api } from "./api";
import { TFMInstance, TFMOptions } from "./types";
import { TFMError } from "./errors";
import { HealthCheck } from "./health-check";
import { IBC } from "./v1/ibc";
import { DEX } from "./v1/dex";
import { Price } from "./v1/pricing";
import { DEFAULT_BASE_URL } from "./constants";

export class Client implements TFMInstance {
  private api: Api;
  private initialized = false;
  private baseURL: string;
  private versionURL = "/api/v1";
  priceInstance: Price;
  dexInstance: DEX;
  ibcInstance: IBC;
  /**
   * Creates a new instance of the `Client` class.
   * @param options The options for configuring the TFM client.
   */
  public constructor(options?: TFMOptions) {
    this.baseURL = options?.baseURL ?? DEFAULT_BASE_URL;
    this.api = new Api(`${this.baseURL}${this.versionURL}`);
    this.priceInstance = new Price(this.api);
    this.dexInstance = new DEX(this.api);
    this.ibcInstance = new IBC(this.api);
  }

  /**
   * Initializes the TFM client by fetching the chains.
   * @returns A promise that resolves when the initialization is complete.
   */
  async init(): Promise<void> {
    await new HealthCheck(new Api(this.baseURL)).isHealthy();
    console.log("TFM SDK initialized successfully.");
    this.initialized = true;
  }

  get price() {
    this.checkInitialized();
    return this.priceInstance;
  }

  get dex() {
    this.checkInitialized();
    return this.dexInstance;
  }

  get ibc() {
    this.checkInitialized();
    return this.ibcInstance;
  }

  /**
   * Checks if the TFM client is initialized and throws an error if not.
   * @throws {TFMError} If the TFM client is not initialized.
   */
  private checkInitialized(): void {
    if (!this.initialized) {
      throw new TFMError({
        message: "TFM SDK is not initialized",
      });
    }
  }
}
