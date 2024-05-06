"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetStatus = exports.GetOrderByID = exports.revenueShipperTimeTwoTime = exports.getHistoryReviews = exports.getReviews = void 0;

var _AxiosInstance = _interopRequireDefault(require("../../http/AxiosInstance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getReviews = function getReviews() {
  var axiosInstance, url;
  return regeneratorRuntime.async(function getReviews$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = "orders/historyReviewShipper/6604e1ec5a6c5ad8711aebf9";
          _context.next = 5;
          return regeneratorRuntime.awrap(axiosInstance.get(url));

        case 5:
          return _context.abrupt("return", _context.sent);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getReviews = getReviews;

var getHistoryReviews = function getHistoryReviews(id) {
  var axiosInstance, url;
  return regeneratorRuntime.async(function getHistoryReviews$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = "reviews/gethistoryreview/6604e1ec5a6c5ad8711aebf9";
          _context2.next = 5;
          return regeneratorRuntime.awrap(axiosInstance.get(url));

        case 5:
          return _context2.abrupt("return", _context2.sent);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          throw _context2.t0;

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; //6604e1ec5a6c5ad8711aebf9


exports.getHistoryReviews = getHistoryReviews;

var revenueShipperTimeTwoTime = function revenueShipperTimeTwoTime(ID, startDate) {
  var axiosInstance, url, body;
  return regeneratorRuntime.async(function revenueShipperTimeTwoTime$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = 'shippers/RevenueTTT';
          body = {
            ID: ID,
            startDate: startDate,
            endDate: startDate
          };
          _context3.next = 6;
          return regeneratorRuntime.awrap(axiosInstance.post(url, body));

        case 6:
          return _context3.abrupt("return", _context3.sent);

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          throw _context3.t0;

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.revenueShipperTimeTwoTime = revenueShipperTimeTwoTime;

var GetOrderByID = function GetOrderByID(id) {
  var axiosInstance, url, params;
  return regeneratorRuntime.async(function GetOrderByID$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = 'orders/getOrderById';
          params = {
            id: id
          };
          _context4.next = 6;
          return regeneratorRuntime.awrap(axiosInstance.get(url, {
            params: params
          }));

        case 6:
          return _context4.abrupt("return", _context4.sent);

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          throw _context4.t0;

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.GetOrderByID = GetOrderByID;

var SetStatus = function SetStatus(id, status) {
  var axiosInstance, url, params;
  return regeneratorRuntime.async(function SetStatus$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = 'orders/statusOrder';
          params = {
            id: id,
            status: status
          };
          _context5.next = 6;
          return regeneratorRuntime.awrap(axiosInstance.post(url, {
            params: params
          }));

        case 6:
          return _context5.abrupt("return", _context5.sent);

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          throw _context5.t0;

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.SetStatus = SetStatus;