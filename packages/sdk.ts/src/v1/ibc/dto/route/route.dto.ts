export enum RouteType {
  ibc_transfer = "ibc_transfer",
  chain_swap_operations = "chain_swap_operations",
}

export interface Operation {
  offerToken: string;
  offerChain: string;
  askToken: string;
  askChain: string;
  exchange: string;
  poolId: string | null;
  contractAddr: string;
}

export interface ChainRoute {
  inputAmount: string;
  returnAmount: string;
  priceImpact: string;
  inputPercent: string;
  operations: Operation[];
}

export interface ChainSwapOperationsRoute {
  type: RouteType.chain_swap_operations;
  inputAmount: string;
  returnAmount: string;
  priceImpact: string;
  chainName: string;
  chainId: string;
  routes: ChainRoute[];
  alternatives: Record<string, ChainRoute>;
  wasmHookTransaction: boolean;
  contractIbcForward: boolean;
}

export interface IBCTransferRoute {
  type: RouteType.ibc_transfer;
  inputAmount: string;
  returnAmount: string;
  sourceDenom: string;
  destinationDenom: string;
  sourceChainId: string;
  destinationChainId: string;
  sourceChainName: string;
  destinationChainName: string;
  sourceChannel: string;
  destinationChannel: string;
  sourcePort: string;
  destinationPort: string;
  pfmTransaction: boolean;
}

export interface CommonRouteDto {
  inputAmount: string;
  returnAmount: string;
  sourceChainId: string;
  destinationChainId: string;
  sourceChainName: string;
  destinationChainName: string;
  askToken: string;
  offerToken: string;
  routes: (IBCTransferRoute | ChainSwapOperationsRoute)[];
}

export type TransferRouteDto = CommonRouteDto;
export type SwapRouteDto = CommonRouteDto;
