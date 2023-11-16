import { ApiErrorResponse, ApiOkResponse, ApiResponse } from "apisauce";
export * from "./errors";

interface TFMInstance {
  init(): Promise<void>;
}

interface TFMOptions {
  baseURL?: string;
}

type TFMApiResponse<T, U = T> = ApiResponse<T, U>;
type TFMApiErrorResponse<T = any> = ApiErrorResponse<T>;
type TFMApiOkResponse<T = any> = ApiOkResponse<T>;

interface TFMErrorData {
  message: string;
}

interface TFMApiErrorData extends TFMErrorData {
  apiResponseError: TFMApiErrorResponse;
}

export {
  TFMApiResponse,
  TFMApiErrorResponse,
  TFMApiOkResponse,
  TFMErrorData,
  TFMApiErrorData,
  TFMInstance,
  TFMOptions,
};
