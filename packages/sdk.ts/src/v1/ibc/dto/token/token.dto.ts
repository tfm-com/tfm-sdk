export interface IbcTokenDto {
  name: string;
  symbol: string;
  contractAddr: string;
  decimals: number;
  numberOfPools: number | null;
  imageUrl: string;
  isTrading: boolean;
}
