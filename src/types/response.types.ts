export interface TError {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: { path: string; message: string }[];
  };
}
export interface TResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}