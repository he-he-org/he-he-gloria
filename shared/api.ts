export interface SuccessResponse<T = unknown> {
  tag: "SUCCESS";
  data: T;
}
export interface FailedResponse {
  tag: "FAILED";
  message: string;
}

export type Response<T = unknown> = SuccessResponse<T> | FailedResponse;
