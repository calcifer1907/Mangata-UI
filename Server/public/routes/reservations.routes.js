"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _reservationController = require("../controllers/reservation.controller.js");
var _authMiddleware = require("../handles/authMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/reservations", _reservationController.createReservation);
router.post("/mycommissions", _authMiddleware.authenticate, _reservationController.getListSalesEmployee);
router.post("/mySales", _authMiddleware.authenticate, _reservationController.getListSalesAdmin);
router.post("/changeStatusReservation", _authMiddleware.authenticate, _reservationController.changeStatusReservation);
router.get("/lunches", _reservationController.getLunches);
router.get("/MimMax", _reservationController.getMinMax);
var _default = exports["default"] = router;