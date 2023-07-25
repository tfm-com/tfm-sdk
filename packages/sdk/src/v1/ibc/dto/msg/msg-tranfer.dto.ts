export interface MsgTokenDto {
  amount: string;
  denom: string;
}

export interface MsgValueDto {
  receiver: string;
  sender: string;
  sourceChannel: string;
  sourcePort: string;
  timeoutTimestamp: string;
  token: MsgTokenDto;
}

export interface MsgInfoDto {
  typeUrl: string;
  value: MsgValueDto;
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
  msg: MsgInfoDto[];
}
