import { WasmDto } from "./msg-swap.dto";

export interface TransferMsgTokenDto {
  amount: string;
  denom: string;
}
export interface TransferMsgForwardNextDto {
  wasm?: WasmDto;
}
export interface TransferMsgForwardDto {
  receiver: string;
  port: string;
  channel: string;
  next?: TransferMsgForwardNextDto;
}
export interface TransferMsgMemoDto {
  forward?: TransferMsgForwardDto;
  wasm?: WasmDto;
}
export interface TransferMsgMsgValue {
  receiver: string;
  sender: string;
  source_channel: string;
  source_port: string;
  timeoutTimestamp: string;
  token: TransferMsgTokenDto;
  memo: TransferMsgMemoDto;
}
export interface TransferMsgMsg {
  typeUrl: string;

  value: TransferMsgMsgValue;
}

export interface TransferMsgDto {
  type: string;
  chainID: string;
  chainName: string;
  destinationChainID: string;
  destinationChainName: string;
  sourceChannel: string;
  destinationChannel: string;
  sourcePort: string;
  destinationPort: string;
  msg: TransferMsgMsg[];
  fallback_msg?: TransferMsgDto[];
}
