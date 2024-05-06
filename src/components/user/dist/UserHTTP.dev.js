"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _AxiosInstance = _interopRequireDefault(require("../../http/AxiosInstance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(phoneNumber, password) {
  var axiosInstance, url, body;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = 'shippers/login';
          body = {
            phoneNumber: phoneNumber,
            password: password
          };
          _context.next = 6;
          return regeneratorRuntime.awrap(axiosInstance.post(url, body));

        case 6:
          return _context.abrupt("return", _context.sent);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          throw _context.t0;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.login = login;