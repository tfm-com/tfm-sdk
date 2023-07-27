import { TFMError } from "../../errors";
import {
  validateSourceAndDestinationChain,
  validateSourceAndDestinationDenom,
  validateOneOfDenomsShouldBeIBc,
} from "./validation";

describe("Validation Functions", () => {
  it("validateSourceAndDestinationChain should throw TFMError if sourceChainId and destinationChainId are the same", () => {
    const sourceChainId = "chain1";
    const destinationChainId = "chain1";

    expect(() =>
      validateSourceAndDestinationChain(sourceChainId, destinationChainId),
    ).toThrow(TFMError);
  });

  it("validateSourceAndDestinationChain should not throw an error if sourceChainId and destinationChainId are different", () => {
    const sourceChainId = "chain1";
    const destinationChainId = "chain2";

    expect(() =>
      validateSourceAndDestinationChain(sourceChainId, destinationChainId),
    ).not.toThrow();
  });

  it("validateSourceAndDestinationDenom should throw TFMError if sourceDenom and destinationDenom are the same", () => {
    const sourceDenom = "denom1";
    const destinationDenom = "denom1";

    expect(() =>
      validateSourceAndDestinationDenom(sourceDenom, destinationDenom),
    ).toThrow(TFMError);
  });

  it("validateSourceAndDestinationDenom should not throw an error if sourceDenom and destinationDenom are different", () => {
    const sourceDenom = "denom1";
    const destinationDenom = "denom2";

    expect(() =>
      validateSourceAndDestinationDenom(sourceDenom, destinationDenom),
    ).not.toThrow();
  });

  it("validateOneOfDenomsShouldBeIBc should throw TFMError if neither denom0 nor denom1 starts with 'ibc'", () => {
    const denom0 = "token1";
    const denom1 = "token2";

    expect(() => validateOneOfDenomsShouldBeIBc(denom0, denom1)).toThrow(
      TFMError,
    );
  });

  it("validateOneOfDenomsShouldBeIBc should not throw an error if denom0 starts with 'ibc'", () => {
    const denom0 = "ibc/token1";
    const denom1 = "token2";

    expect(() => validateOneOfDenomsShouldBeIBc(denom0, denom1)).not.toThrow();
  });

  it("validateOneOfDenomsShouldBeIBc should not throw an error if denom1 starts with 'ibc'", () => {
    const denom0 = "token1";
    const denom1 = "ibc/token2";

    expect(() => validateOneOfDenomsShouldBeIBc(denom0, denom1)).not.toThrow();
  });

  it("validateOneOfDenomsShouldBeIBc should not throw an error if both denom0 and denom1 start with 'ibc'", () => {
    const denom0 = "ibc/token1";
    const denom1 = "ibc/token2";

    expect(() => validateOneOfDenomsShouldBeIBc(denom0, denom1)).not.toThrow();
  });
});
