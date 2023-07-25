import { Api } from "../../api";
import { GetMsgDto } from "./dto/get-msg.dto";
import { GetRouteDto } from "./dto/get-route.dto";
import { MsgDto } from "./dto/msg.dto";
import { RouteDto } from "./dto/route.dto";

export class DexProcessor {
  constructor(private readonly api: Api) {}
  async getRoute({
    chainId,
    sourceDenom,
    destinationDenom,
    amount,
  }: GetRouteDto): Promise<RouteDto> {
    sourceDenom = encodeURIComponent(sourceDenom);
    const url = `/dex-aggregator/route/${chainId}/${sourceDenom}/${destinationDenom}/${amount}`;
    return await this.api.makeGetRequest<RouteDto>(url);
  }

  async getMsg({
    chainId,
    sourceDenom,
    destinationDenom,
    amount,
    slippage = 0.01,
  }: GetMsgDto): Promise<MsgDto> {
    sourceDenom = encodeURIComponent(sourceDenom);
    let url = `/dex-aggregator/msg/${chainId}/${sourceDenom}/${destinationDenom}/${amount}`;

    if (slippage) {
      url += `?slippage=${slippage}`;
    }

    return await this.api.makeGetRequest<MsgDto>(url);
  }
}
