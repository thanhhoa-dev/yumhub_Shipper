"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AxiosInstance = function AxiosInstance() {
  var contentType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'application/json';

  var axiosInstance = _axios["default"].create({
    baseURL: 'http://192.168.89.148:3000/' // timeout: 10000,

  });

  axiosInstance.interceptors.request.use(function _callee(config) {
    var token;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // const token = await AsyncStorage.getItem('token');
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3NzY2MTY4MTgyIiwic2V4IjoiTWFsZSIsImVtYWlsIjoiaG9hbmdrdW42MTBAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJHcmVnIiwiYXZhdGFyIjoiaHR0cDovL2R1bW15aW1hZ2UuY29tLzE0NHgxMDAucG5nL2ZmNDQ0NC9mZmZmZmYiLCJiaXJ0aERheSI6IjUvMTMvMjAyMyIsImpvaW5EYXkiOiIyMDIzLTExLTIyVDE3OjAwOjAwLjAwMFoiLCJicmFuZEJpa2UiOiIzNjk4Ny0yMzA4IiwibW9kZUNvZGUiOiJZZWxsb3ciLCJpZEJpa2UiOiIkMmEkMDQkWTlXSVdWMkR1ME5lR3R4TS96SjFaT2FyL1VXRjd4Z1Z1R01EWk1oL0dleXpBWnlhcGxaMmEiLCJpYXQiOjE3MTQ4Nzg4NDQsImV4cCI6MTcxNzQ3MDg0NH0.vrazMn4sOhiMaMm0nSRnd7cWLzYWBfd6uFhTjOVfnWw";
            config.headers = {
              'Authorization': "Bearer ".concat(token),
              'Accept': 'application/json',
              'Content-Type': contentType
            };
            return _context.abrupt("return", config);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }, function (err) {
    return Promise.reject(err);
  });
  axiosInstance.interceptors.response.use(function (res) {
    return res.data;
  }, function (err) {
    return Promise.reject(err);
  });
  return axiosInstance;
};

var _default = AxiosInstance;
exports["default"] = _default;