"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authMiddleware = require("../handles/authMiddleware.js");
var _handleEror = require("../handles/handleEror.js");
var _userController = require("../controllers/user.controller.js");
var router = (0, _express.Router)();
router.post("/createUser", _userController.createUser);
router.post("/getuserid", _userController.getSearchUser);
var _default = exports["default"] = router;