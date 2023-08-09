/* eslint-disable complexity */
import { Api } from "../../api";
import { IbcChainProcessor } from "./ibc-chain-processor";
import { IbcSwapProcessor } from "./ibc-swap-processor";
import { IbcTransferProcessor } from "./ibc-transfer-processor";

export class IbcProcessor {
  chains: IbcChainProcessor;
  transfer: IbcTransferProcessor;
  swap: IbcSwapProcessor;

  constructor(private readonly api: Api) {
    this.chains = new IbcChainProcessor(this.api);
    this.transfer = new IbcTransferProcessor(this.api);
    this.swap = new IbcSwapProcessor(this.api);
  }
}
