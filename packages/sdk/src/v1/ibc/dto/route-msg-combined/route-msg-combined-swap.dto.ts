import { SwapMsgDto } from "../msg/msg-swap.dto";
import { SwapRouteDto } from "../route/route.dto";

export interface RouteMsgCombinedSwapDto {
  route: SwapRouteDto;
  msgs: SwapMsgDto[];
}
