"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.hashPassword = exports.createToken = exports.comparePassword = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var JWT_SECRET = process.env.JWT_SECRET || "mangata.cartagena";
var JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";
var createToken = exports.createToken = function createToken(userId, username) {
  return _jsonwebtoken["default"].sign({
    userId: userId,
    username: username
  }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION
  });
};
var verifyToken = exports.verifyToken = function verifyToken(token) {
  try {
    return _jsonwebtoken["default"].verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
var hashPassword = exports.hashPassword = function hashPassword(password) {
  return _bcryptjs["default"].hashSync(password, 10);
};
var comparePassword = exports.comparePassword = function comparePassword(password, hash) {
  return _bcryptjs["default"].compareSync(password, hash);
};