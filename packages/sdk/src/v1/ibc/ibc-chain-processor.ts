/* eslint-disable complexity */
import { ChainDto } from "./dto/chain/chain.dto";
import { ChainReachableDto } from "./dto/chain/chain-reachable.dto";
import { GetAllChainTokensDto } from "./dto/chain/get-all-chain-tokens.dto";
import { GetAllChainsDto } from "./dto/chain/get-all-chains.dto";
import { GetChainTokenDto } from "./dto/chain/get-chain-token.dto";
import { IbcTokenDto } from "./dto/token/token.dto";
import { TokenTransferPairDto } from "./dto/token/token-transfer-pair.dto";
import { TokenTransferableDto } from "./dto/token/token-transferable.dto";
import { Api } from "../../api";
import { TFMError } from "../../errors";

export class IbcChainProcessor {
  constructor(private readonly api: Api) {}

  async getAllChains({ isTrading, networkType }: GetAllChainsDto = {}): Promise<
    ChainDto[]
  > {
    let url = `/ibc/chain`;

    const queryParams = [];
    if (isTrading) {
      queryParams.push(`isTrading=${isTrading}`);
    }

    if (networkType) {
      queryParams.push(`networkType=${networkType}`);
    }

    url += queryParams.length ? `?${queryParams.join("&")}` : "";

    return await this.api.makeGetRequest<ChainDto[]>(url);
  }

  async getAllChainTokens(
    chainId: string,
    { isTrading, tokenType }: GetAllChainTokensDto = {},
  ): Promise<IbcTokenDto[]> {
    let url = `/ibc/chain/${chainId}/tokens`;

    const queryParams = [];
    if (isTrading) {
      queryParams.push(`isTrading=${isTrading}`);
    }

    if (tokenType) {
      queryParams.push(`tokenType=${tokenType}`);
    }

    url += queryParams.length ? `?${queryParams.join("&")}` : "";

    return await this.api.makeGetRequest<IbcTokenDto[]>(url);
  }

  async getChainToken({
    chainId,
    denom,
  }: GetChainTokenDto): Promise<IbcTokenDto> {
    denom = encodeURIComponent(denom);
    const url = `/ibc/chain/${chainId}/token/${denom}}`;

    return await this.api.makeGetRequest<IbcTokenDto>(url);
  }

  async getAllReachableChains(chainId: string): Promise<ChainDto[]> {
    const url = `/ibc/chain/${chainId}/reachable-chains`;
    return await this.api.makeGetRequest<ChainDto[]>(url);
  }

  async chainIsReachable(
    sourceChainId: string,
    destinationChainId: string,
  ): Promise<ChainReachableDto> {
    const url = `/ibc/chain/${sourceChainId}/reachable-chain/${destinationChainId}`;
    return await this.api.makeGetRequest<ChainReachableDto>(url);
  }

  async getAllTransferableTokens(
    sourceChainId: string,
    destinationChainId: string,
  ): Promise<TokenTransferPairDto[]> {
    this.validateSourceAndDestinationChain(sourceChainId, destinationChainId);

    const url = `/ibc/chain/${sourceChainId}/transferable-tokens/${destinationChainId}`;
    return await this.api.makeGetRequest<TokenTransferPairDto[]>(url);
  }

  async tokenIsTransferable(
    sourceChainId: string,
    destinationChainId: string,
    denom: string,
  ): Promise<TokenTransferableDto> {
    this.validateSourceAndDestinationChain(sourceChainId, destinationChainId);
    denom = encodeURIComponent(denom);
    const url = `/ibc/chain/${sourceChainId}/transferable-token/${destinationChainId}/${denom}`;
    return await this.api.makeGetRequest<TokenTransferableDto>(url);
  }

  private validateSourceAndDestinationChain(
    sourceChainId: string,
    destinationChainId: string,
  ): void {
    if (sourceChainId === destinationChainId) {
      throw new TFMError({
        message: "Source and destination chain cannot be the same",
      });
    }
  }
}
