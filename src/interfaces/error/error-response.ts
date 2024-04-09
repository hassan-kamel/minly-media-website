export interface IErrorResponse {
  error: IError;
  message: string;
}

interface IError {
  statusCode: number;
  status: string;
  error: unknown;
}
