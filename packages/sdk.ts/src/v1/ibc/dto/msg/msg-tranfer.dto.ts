export interface TransferMsgTokenDto {
  amount: string;
  denom: string;
}

export interface TransferMsgForwardDto {
  receiver: string;
  port: string;
  channel: string;
}
export interface TransferMsgMemoDto {
  forward: TransferMsgForwardDto;
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
