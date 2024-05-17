import { ErrorCode } from "./errorCode";

type InternalError = {
    message: string;      // User-friendly error message explaining the issue
    data?: any;           // Optional: Additional data related to the error (e.g., validation errors as an object)
    statusCode?: number;  // HTTP status code associated with the error
    code: ErrorCode;      // Unique identifier for the error type (e.g., "VALIDATION_ERROR", "NOT_FOUND")
}

const isInternalError = (error: any): error is InternalError => {
    return error && (error as InternalError).code != undefined;
}

export { InternalError, isInternalError };