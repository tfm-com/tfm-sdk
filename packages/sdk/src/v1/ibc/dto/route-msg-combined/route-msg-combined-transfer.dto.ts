import { TransferMsgDto } from "../msg/msg-tranfer.dto";
import { TransferRouteDto } from "../route/route.dto";

export interface RouteMsgCombinedTransferDto {
  route: TransferRouteDto;
  msgs: TransferMsgDto[];
}
