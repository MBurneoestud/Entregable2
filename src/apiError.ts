/**
 * apiError.ts
 * ----------
 * Custom error class for API error handling with HTTP status codes.
 * Used throughout the application for consistent error responses.
 */

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
