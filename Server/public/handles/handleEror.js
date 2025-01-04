"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleError = void 0;
var handleError = exports.handleError = function handleError(error, request, response, next) {
  console.log(error);
  if (error.code === "ER_DUP_ENTRY") {
    return response.status(409).json({
      status: 409,
      error: "Conflict",
      message: "El correo ya existe"
    });
  }

  // Otros errores
  response.status(500).json({
    status: 500,
    error: "Internal Server Error",
    message: "Sometghin gos wrong"
  });
  next();
};