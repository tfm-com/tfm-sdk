export interface IbcSwapNativeTokenInfo {
  denom: string;
}

export interface IbcSwapTokenInfo {
  contract_addr: string;
}

export interface IbsSwapMsgAssetInfo {
  native_token: IbcSwapNativeTokenInfo;
  token?: IbcSwapTokenInfo;
}

export interface IbcSwapMsgOperationDetail {
  factory_name: string;
  pair_contract: string;
  offer_asset_info: IbsSwapMsgAssetInfo;
  ask_asset_info: IbsSwapMsgAssetInfo;
}

export interface IbcSwapMsgOperation {
  offer_amount: string;
  operations: IbcSwapMsgOperationDetail[];
}

export interface IbcSwapExecuteSwapOperations {
  minimum_receive: string;
  offer_amount: string;
  max_spread: string;
  to: string;
  routes: IbcSwapMsgOperation[];
}

export interface IbcSwapExecuteMsg {
  execute_swap_operations: IbcSwapExecuteSwapOperations;
}

export interface SwapMsgCoin {
  denom: string;
  amount: string;
}

export interface SwapMsgValue {
  coins: SwapMsgCoin[];
  contract: string;
  execute_msg: IbcSwapExecuteMsg;
  sender: string;
}

export interface SwapMsgDto {
  value: SwapMsgValue;
  type: string;
}
