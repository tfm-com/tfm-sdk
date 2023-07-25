export interface NativeTokenDto {
  denom: string;
}

export interface TokenDto {
  contract_addr: string;
}

export interface OfferAssetInfoDto {
  native_token?: NativeTokenDto;
  token?: TokenDto;
}

export interface AskAssetInfoDto {
  token: TokenDto;
}

export interface SwapOperationDto {
  offer_asset_info: OfferAssetInfoDto;
  ask_asset_info: AskAssetInfoDto;
  factory_name: string;
  pair_contract: string;
}

export interface MsgRouteComponentDto {
  offer_amount: string;
  operations: SwapOperationDto[];
}

export interface ExecuteSwapOperationsDto {
  minimum_receive: string;
  offer_amount: string;
  max_spread: string;
  to: string;
  routes: MsgRouteComponentDto[];
}

export interface ExecuteMsgDto {
  execute_swap_operations: ExecuteSwapOperationsDto;
}

export interface AssetInfo {
  denom: string;
  amount: string;
}

export interface ValueDto {
  coins: AssetInfo[];
  contract: string;
  execute_msg: ExecuteMsgDto;
  sender: string;
}

export interface MsgDto {
  type: string;
  value: ValueDto;
}
