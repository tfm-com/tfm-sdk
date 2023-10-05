export enum ChainNetworkType {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
}

export enum ChainStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export interface ChainDto {
  id: number;
  chainName: string;
  prettyName: string;
  chainId: string;
  networkType: ChainNetworkType;
  status: ChainStatus;
  githubUrl: string;
  isTrading: boolean;
  imageUrl: string;
  isPfmEnabled: boolean | null;
  isWasmHookEnabled: boolean | null;
}
