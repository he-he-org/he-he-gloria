import {Lang} from "./dataTypes/lang";

export interface SuccessResponse<T = unknown> {
  tag: "SUCCESS";
  data: T;
}
export interface FailedResponse {
  tag: "FAILED";
  code: number;
  message: string;
}

export type Response<T = unknown> = SuccessResponse<T> | FailedResponse;
