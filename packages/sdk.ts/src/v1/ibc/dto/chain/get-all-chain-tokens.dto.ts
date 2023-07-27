import { TokenType } from "../../types";

export interface GetAllChainTokensDto {
  isTrading?: boolean;
  tokenType?: TokenType;
}
