"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = void 0;
var _auth = require("../auth.js");
// Middleware para proteger las rutas
var authenticate = exports.authenticate = function authenticate(req, res, next) {
  var token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      message: "Token no proporcionado"
    });
  }

  // Eliminar "Bearer " del token
  var bearerToken = token.split(" ")[1];
  var decoded = (0, _auth.verifyToken)(bearerToken);
  if (!decoded) {
    return res.status(403).json({
      message: "Token no válido"
    });
  }

  // Si el token es válido, adjuntamos la información del usuario al request
  req.user = decoded;
  next();
};