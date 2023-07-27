export interface GetMsgDto {
  chainId: string;
  sourceDenom: string;
  destinationDenom: string;
  amount: string;
  slippage?: number;
}
