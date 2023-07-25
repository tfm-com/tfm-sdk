import { IbcTokenDto } from "./token.dto";

export interface TokenTransferPairDto {
  sourceToken: IbcTokenDto;
  destinationToken: IbcTokenDto;
}
