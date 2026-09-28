export class ResponseValidationError extends Error {
  constructor(message = "Invalid response data") {
    super(message);
    this.name = "ResponseValidationError";
  }
}
