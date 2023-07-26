export interface ChainDto {
  id: number;
  chainName: string;
  prettyName: string;
  chainId: string;
  networkType: string;
  status: string;
  githubUrl: string;
  isTrading: boolean;
  imageUrl: string;
  isPfmEnabled: boolean | null;
  isWasmHookEnabled: boolean | null;
}
