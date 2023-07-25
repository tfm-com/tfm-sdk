import { SwapMode } from "../../enums";
import { GetSwapRouteDto, GetTransferRouteDto } from "../route/get-route.dto";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetTransferMsgDto extends GetTransferRouteDto {
  pfmEnabled?: boolean;
}

export interface GetMsgSwapDto extends GetSwapRouteDto {
  swapMode?: SwapMode;
  slippage?: number;
  pfmEnabled?: boolean;
}
