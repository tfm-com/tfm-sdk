import { ApiErrorResponse, ApiOkResponse, ApiResponse } from "apisauce";

enum ChainNetworkType {
  MAINNET = "mainnet",
  TESTNET = "testnet",
}

interface TFMInstance {
  init(): Promise<void>;
}

interface TFMOptions {
  baseURL?: string;
}

type TFMApiResponse<T, U = T> = ApiResponse<T, U>;
type TFMApiErrorResponse<T = any> = ApiErrorResponse<T>;
type TFMApiOkResponse<T = any> = ApiOkResponse<T>;

interface TFMErrorData {
  message: string;
}

interface TFMApiErrorData extends TFMErrorData {
  apiResponseError: TFMApiErrorResponse;
}

interface Chain {
  id: number;
  chainName: string;
  prettyName: string;
  chainId: string;
  networkType: ChainNetworkType;
  status: string;
}

interface Token {
  name: string;
  symbol: string;
  contractAddr: string;
  decimals: number;
  imageURL: string;
  numberOfPools: number | null;
}

interface Price {
  price: number;
  asset: {
    symbol: string;
    name: string;
    base: string;
  };
  requestDenom: string;
}

interface SwapPair {
  sourceToken: Token;
  destinationToken: Token;
}

interface RouteSwap {
  route: object;
  swap: object[];
}

interface GetTokensParams {
  contractAddr?: string;
  isTrading?: boolean;
  filterIbcButTrading?: boolean;
  filterIbc?: boolean;
}

interface RouteParams {
  chain: Chain;
  token0: string;
  token1: string;
  amount: bigint;
  exchanges?: string[];
}

interface SwapParams extends RouteParams {
  slippage: number;
}

interface RouteOperation {
  type: string;
  inputAmount: bigint;
  returnAmount: bigint;
  priceImpact: number;
  chain: Chain;
  routes: object[];
}

export {
  TFMApiResponse,
  TFMApiErrorResponse,
  TFMApiOkResponse,
  TFMErrorData,
  TFMApiErrorData,
  TFMInstance,
  TFMOptions,
  Chain,
  ChainNetworkType,
  Token,
  Price,
  SwapPair,
  RouteSwap,
  GetTokensParams,
  RouteParams,
  SwapParams,
  RouteOperation,
};
