export interface AssetDto {
  symbol: string;
  name: string;
  base: string;
  decimals: number;
}

export interface PriceDto {
  price: number;
  asset: AssetDto;
  requestDenom: string;
}
