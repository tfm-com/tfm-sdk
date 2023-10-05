export enum SwapType {
  swap = "swap",
  ibc_transfer = "ibc_transfer",
}

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

export interface WasmDto {
  contract: string;

  msg: IbcSwapExecuteMsg;
}

export interface SwapIbcHook {
  source_port: string;
  source_channel: string;
  receiver: string;
  recovery_addr: string;
  port_contract: string;
  memo?: WasmDto;
}

export interface IbcSwapExecuteSwapOperations {
  minimum_receive: string;
  offer_amount: string;
  max_spread: string;
  to: string;
  routes: IbcSwapMsgOperation[];
  swap_ibc_hook?: SwapIbcHook;
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

export interface SwapMsgMsg {
  type: string;
  value: SwapMsgValue;
}

export interface SwapMsgDto {
  msg: SwapMsgMsg[];
  type: SwapType.swap;
  chainID: string;
  chainName: string;
}
