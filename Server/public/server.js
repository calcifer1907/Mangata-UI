"use strict";

var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _usersRoutes = _interopRequireDefault(require("../src/routes/users.routes.js"));
var _protectedRoutes = _interopRequireDefault(require("../src/routes/protected.routes.js"));
var _loginRoutes = _interopRequireDefault(require("../src/routes/login.routes.js"));
var _reservationsRoutes = _interopRequireDefault(require("../src/routes/reservations.routes.js"));
var _handleEror = require("./handles/handleEror.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.0.233:5173", "http://172.20.10.3:5173"]
};
var PORT = 80;
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])(corsOptions));
app.use("/auth", _loginRoutes["default"]);
app.use("/api", _usersRoutes["default"]);
app.use("/api", _protectedRoutes["default"]);
app.use("/api", _reservationsRoutes["default"]);
app.use(_handleEror.handleError);
app.listen(PORT, function () {
  console.log("listening on port ".concat(PORT));
});