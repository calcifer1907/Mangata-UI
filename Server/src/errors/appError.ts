export default class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indica si el error es operacional (esperado)

    // Captura la stack trace (útil para depuración)
    Error.captureStackTrace(this, this.constructor);
  }
}
