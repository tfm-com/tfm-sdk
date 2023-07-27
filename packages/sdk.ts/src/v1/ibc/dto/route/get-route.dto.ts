import { SwapMode } from "../../enums";

export interface GetCommonRouteDto {
  sourceChainId: string;
  destinationChainId: string;
  sourceDenom: string;
  destinationDenom: string;
  amount: string;
}

export type GetTransferRouteDto = GetCommonRouteDto;
export type GetSwapRouteDto = GetCommonRouteDto & {
  swapMode?: SwapMode;
};
