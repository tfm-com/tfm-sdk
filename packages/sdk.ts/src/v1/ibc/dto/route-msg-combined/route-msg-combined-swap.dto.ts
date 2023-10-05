import { SwapMsgDto } from "../msg/msg-swap.dto";
import { SwapRouteDto } from "../route/route.dto";
import { TransferMsgDto } from "../msg/msg-tranfer.dto";

export interface RouteMsgCombinedSwapDto {
  route: SwapRouteDto;
  msgs: (SwapMsgDto | TransferMsgDto)[];
}
