export interface RouteOperationDto {
  offerToken: string;
  offerChain: string;
  askToken: string;
  askChain: string;
  exchange: string;
  poolId: number;
  contractAddr: string;
}

export interface RouteInfoDto {
  inputAmount: number;
  returnAmount: number;
  priceImpact: number;
  inputPercent: number;
  operations: RouteOperationDto[];
}
export interface AlternativesDto {
  inputAmount: number;
  returnAmount: number;
  priceImpact: number;
  inputPercent: number;
  operations: RouteOperationDto[];
}

export interface RouteDto {
  type: string;
  inputAmount: number;
  returnAmount: number;
  priceImpact: number;
  chainName: string;
  chainId: string;
  routes: RouteInfoDto[];
  alternatives?: AlternativesDto;
  wasmHookTransaction: boolean;
  contractIbcForward: boolean;
}
