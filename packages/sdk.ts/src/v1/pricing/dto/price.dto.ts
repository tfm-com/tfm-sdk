export interface AssetDto {
  symbol: string;
  name: string;
  base: string;
}

export interface PriceDto {
  price: number;
  asset: AssetDto;
  requestDenom: string;
}
