/* eslint-disable complexity */
import { Api } from "../../api";
import { TFMError } from "../../errors";
import { RouteMsgCombinedSwapDto } from "./dto/route-msg-combined/route-msg-combined-swap.dto";
import { SwapMsgDto } from "./dto/msg/msg-swap.dto";
import { GetSwapRouteDto } from "./dto/route/get-route.dto";
import { SwapRouteDto } from "./dto/route/route.dto";
import { GetMsgSwapDto } from "./dto/msg/get-msg.dto";
import { GetSwapRouteMsgCombinedDto } from "./dto/route-msg-combined/get-route-msg-combined.dto";
import { SwapMode } from "./enums";

export class IbcSwapProcessor {
  constructor(private readonly api: Api) {}

  async getSwapRoute({
    sourceChainId,
    destinationChainId,
    sourceDenom,
    destinationDenom,
    amount,
    swapMode = SwapMode.Turbo,
  }: GetSwapRouteDto): Promise<SwapRouteDto> {
    this.validateSourceAndDestinationChain(sourceChainId, destinationChainId);
    this.validateSourceAndDestinationDenom(sourceDenom, destinationDenom);

    sourceDenom = encodeURIComponent(sourceDenom);
    destinationDenom = encodeURIComponent(destinationDenom);

    let url = `/ibc/swap/route/${sourceChainId}/${destinationChainId}/${sourceDenom}/${destinationDenom}/${amount}`;

    url += `?swapMode=${swapMode}`;

    this.api.updateTimeout(60000);
    return await this.api.makeGetRequest<SwapRouteDto>(url);
  }

  async getSwapMsg({
    sourceChainId,
    destinationChainId,
    sourceDenom,
    destinationDenom,
    amount,
    swapMode = SwapMode.Turbo,
    pfmEnabled,
    slippage = 0.01,
  }: GetMsgSwapDto): Promise<SwapMsgDto> {
    this.validateSourceAndDestinationChain(sourceChainId, destinationChainId);
    this.validateSourceAndDestinationDenom(sourceDenom, destinationDenom);

    sourceDenom = encodeURIComponent(sourceDenom);
    destinationDenom = encodeURIComponent(destinationDenom);

    let url = `/ibc/swap/msg/${sourceChainId}/${destinationChainId}/${sourceDenom}/${destinationDenom}/${amount}`;

    url += `?swapMode=${swapMode}`;

    if (pfmEnabled !== undefined) {
      url += `&pfmEnabled=${pfmEnabled}`;
    }

    if (slippage !== undefined) {
      url += `&slippage=${slippage}`;
    }

    this.api.updateTimeout(60000);
    return await this.api.makeGetRequest<SwapMsgDto>(url);
  }

  async getSwapRouteMsgCombined({
    sourceChainId,
    destinationChainId,
    sourceDenom,
    destinationDenom,
    amount,
    swapMode = SwapMode.Turbo,
    slippage = 0.01,
    pfmEnabled,
  }: GetSwapRouteMsgCombinedDto): Promise<RouteMsgCombinedSwapDto> {
    this.validateSourceAndDestinationChain(sourceChainId, destinationChainId);
    this.validateSourceAndDestinationDenom(sourceDenom, destinationDenom);

    sourceDenom = encodeURIComponent(sourceDenom);
    destinationDenom = encodeURIComponent(destinationDenom);

    let url = `/ibc/swap/route-msg-combined/${sourceChainId}/${destinationChainId}/${sourceDenom}/${destinationDenom}/${amount}`;

    url += `?swapMode=${swapMode}`;

    if (pfmEnabled !== undefined) {
      url += `&pfmEnabled=${pfmEnabled}`;
    }

    if (slippage !== undefined) {
      url += `&slippage=${slippage}`;
    }

    this.api.updateTimeout(300000);
    return await this.api.makeGetRequest<RouteMsgCombinedSwapDto>(url);
  }

  private validateSourceAndDestinationChain(
    sourceChainId: string,
    destinationChainId: string,
  ): void {
    if (sourceChainId === destinationChainId) {
      throw new TFMError({
        message: "Source and destination chain cannot be the same",
      });
    }
  }

  private validateSourceAndDestinationDenom(
    sourceDenom: string,
    destinationDenom: string,
  ): void {
    if (sourceDenom === destinationDenom) {
      throw new TFMError({
        message: "Source and destination denom cannot be the same",
      });
    }
  }
}
