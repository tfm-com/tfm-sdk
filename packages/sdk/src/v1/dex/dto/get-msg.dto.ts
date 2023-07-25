export interface GetMsgDto {
  chainId: string;
  sourceDenom: string;
  destinationDenom: string;
  amount: number;
  slippage?: number;
}
