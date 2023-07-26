export interface IbcRouteOperationDto {
  offerToken: string;
  offerChain: string;
  askToken: string;
  askChain: string;
  exchange: string;
  poolId: string | null;
  contractAddr: string;
}

export interface RouteComponentDto {
  inputAmount: number;
  returnAmount: number;
  priceImpact: number;
  inputPercent: number;
  operations: IbcRouteOperationDto[];
}

export interface CommonRouteDto {
  inputAmount: number;
  returnAmount: number;
  sourceChainId: string;
  destinationChainId: string;
  sourceChainName: string;
  destinationChainName: string;
  askToken: string;
  offerToken: string;
  routes: RouteComponentDto[];
}

export type TransferRouteDto = CommonRouteDto;
export type SwapRouteDto = CommonRouteDto;
