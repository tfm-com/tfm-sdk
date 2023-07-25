import { TFMApiErrorData, TFMApiErrorResponse, TFMErrorData } from "./types";

export class TFMError extends Error {
  constructor({ message }: TFMErrorData) {
    super(message);
  }
}

export class TFMApiError extends TFMError {
  apiResponseError: TFMApiErrorResponse;
  constructor({ message, apiResponseError }: TFMApiErrorData) {
    super({ message });
    this.apiResponseError = apiResponseError;
  }
}
