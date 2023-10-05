/* eslint-disable complexity */
import { Api } from "../../api";
import { GetTransferRouteDto } from "./dto/route/get-route.dto";
import { TransferRouteDto } from "./dto/route/route.dto";
import { GetTransferMsgDto } from "./dto/msg/get-msg.dto";
import { TransferMsgDto } from "./dto/msg/msg-tranfer.dto";
import { GetTransferRouteMsgCombinedDto } from "./dto/route-msg-combined/get-route-msg-combined.dto";
import { RouteMsgCombinedTransferDto } from "./dto/route-msg-combined/route-msg-combined-transfer.dto";
import {
  validateOneOfDenomsShouldBeIBc,
  validateSourceAndDestinationChain,
  validateSourceAndDestinationDenom,
} from "./validation";

export class IbcTransferProcessor {
  constructor(private readonly api: Api) {}

  async getTransferRoute({
    sourceChainId,
    destinationChainId,
    sourceDenom,
    destinationDenom,
    amount,
  }: GetTransferRouteDto): Promise<TransferRouteDto> {
    validateSourceAndDestinationChain(sourceChainId, destinationChainId);
    validateSourceAndDestinationDenom(sourceDenom, destinationDenom);
    validateOneOfDenomsShouldBeIBc(sourceDenom, destinationDenom);

    sourceDenom = encodeURIComponent(sourceDenom);
    destinationDenom = encodeURIComponent(destinationDenom);

    const url = `/ibc/transfer/route/${sourceChainId}/${destinationChainId}/${sourceDenom}/${destinationDenom}/${amount}`;
    this.api.updateTimeout(60000);
    return await this.api.makeGetRequest<TransferRouteDto>(url);
  }

  async getTransferMsg({
    sourceChainId,
    destinationChainId,
    sourceDenom,
    destinationDenom,
    amount,
  }: GetTransferMsgDto): Promise<TransferMsgDto[]> {
    validateSourceAndDestinationChain(sourceChainId, destinationChainId);
    validateSourceAndDestinationDenom(sourceDenom, destinationDenom);
    validateOneOfDenomsShouldBeIBc(sourceDenom, destinationDenom);

    sourceDenom = encodeURIComponent(sourceDenom);
    destinationDenom = encodeURIComponent(destinationDenom);
    const url = `/ibc/transfer/msg/${sourceChainId}/${destinationChainId}/${sourceDenom}/${destinationDenom}/${amount}`;
    this.api.updateTimeout(60000);
    return await this.api.makeGetRequest<TransferMsgDto[]>(url);
  }

  async getTransferRouteMsgCombined({
    sourceChainId,
    destinationChainId,
    sourceDenom,
    destinationDenom,
    amount,
    pfmEnabled,
  }: GetTransferRouteMsgCombinedDto): Promise<RouteMsgCombinedTransferDto> {
    validateSourceAndDestinationChain(sourceChainId, destinationChainId);
    validateSourceAndDestinationDenom(sourceDenom, destinationDenom);
    validateOneOfDenomsShouldBeIBc(sourceDenom, destinationDenom);

    sourceDenom = encodeURIComponent(sourceDenom);
    destinationDenom = encodeURIComponent(destinationDenom);

    let url = `/ibc/transfer/route-msg-combined/${sourceChainId}/${destinationChainId}/${sourceDenom}/${destinationDenom}/${amount}`;
    if (pfmEnabled !== undefined) {
      url += `?pfmEnabled=${pfmEnabled}`;
    }

    this.api.updateTimeout(300000);
    return await this.api.makeGetRequest<RouteMsgCombinedTransferDto>(url);
  }
}
