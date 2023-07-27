import { TFMError } from "../../errors";

export function validateSourceAndDestinationChain(
  sourceChainId: string,
  destinationChainId: string,
): void {
  if (sourceChainId === destinationChainId) {
    throw new TFMError({
      message: "Source and destination chain cannot be the same",
    });
  }
}

export function validateSourceAndDestinationDenom(
  sourceDenom: string,
  destinationDenom: string,
): void {
  if (sourceDenom === destinationDenom) {
    throw new TFMError({
      message: "Source and destination denom cannot be the same",
    });
  }
}

export function validateOneOfDenomsShouldBeIBc(
  denom0: string,
  denom1: string,
): void {
  if (!(denom0.startsWith("ibc") || denom1.startsWith("ibc"))) {
    throw new TFMError({
      message: "One of the denoms should be ibc",
    });
  }
}
