"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = require("../handles/authMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Ruta protegida
router.get("/protected", _authMiddleware.authenticate, function (request, response) {
  response.json({
    message: "Acceso concedido a ruta protegida",
    user: req.user
  });
});
var _default = exports["default"] = router;