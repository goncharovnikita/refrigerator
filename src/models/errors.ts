export const ValidationErrorType = Symbol("validation_error");
export const ServerErrorType = Symbol("server_error");
export const ClientServerErrorType = Symbol("client_server_error");

export interface Error {
  type: any;
  message: string;
  code?: string;
}

export const isValidationError = (e: Error): boolean => {
  return e.type === ValidationErrorType;
};

export const isServerError = (e: Error): boolean => {
  return e.type === ServerErrorType;
};

export class ValidationError implements Error {
  type = ValidationErrorType;
  constructor(public message: string) {}
}

export class ServerError implements Error {
  type = ServerErrorType;
  constructor(
    public message: string,
    public code: string,
    public status: number
  ) {}
}

export const mapServerError: (
  err: { code: string; message: string },
  status: number
) => ServerError = ({ code, message }, status: number): ServerError => {
  switch (code) {
    default:
      return new ServerError(message, code, status);
  }
};

export enum ServerErrorCodes {
  E_DRAFTS_NO_DRAFT = "E_DRAFTS_NO_DRAFT"
}
