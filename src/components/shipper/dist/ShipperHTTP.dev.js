"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateShipperReview = exports.UpdateShipperInformation = exports.SetDeleteReview = exports.SetStatus = exports.GetOrderByID = exports.revenueShipperTimeTwoTime = exports.getShipperReview = exports.getShipperBeReview = void 0;

var _AxiosInstance = _interopRequireDefault(require("../../http/AxiosInstance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getShipperBeReview = function getShipperBeReview() {
  var axiosInstance, url, params;
  return regeneratorRuntime.async(function getShipperBeReview$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = 'orders/historyShipperIsReview';
          params = {
            id: "6604e1ec5a6c5ad8711aebf9"
          };
          _context.next = 6;
          return regeneratorRuntime.awrap(axiosInstance.get(url, {
            params: params
          }));

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

exports.getShipperBeReview = getShipperBeReview;

var getShipperReview = function getShipperReview() {
  var axiosInstance, url, params;
  return regeneratorRuntime.async(function getShipperReview$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = 'orders/historyShipperReview';
          params = {
            id: "6604e1ec5a6c5ad8711aebf9"
          };
          _context2.next = 6;
          return regeneratorRuntime.awrap(axiosInstance.get(url, {
            params: params
          }));

        case 6:
          return _context2.abrupt("return", _context2.sent);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          throw _context2.t0;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; //6604e1ec5a6c5ad8711aebf9


exports.getShipperReview = getShipperReview;

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

var SetDeleteReview = function SetDeleteReview(id) {
  var axiosInstance, url, params;
  return regeneratorRuntime.async(function SetDeleteReview$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = 'reviews/delete';
          params = {
            id: id
          };
          _context6.next = 6;
          return regeneratorRuntime.awrap(axiosInstance["delete"](url, {
            params: params
          }));

        case 6:
          return _context6.abrupt("return", _context6.sent);

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          throw _context6.t0;

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.SetDeleteReview = SetDeleteReview;

var UpdateShipperInformation = function UpdateShipperInformation(id, status) {
  var axiosInstance, url, params, body;
  return regeneratorRuntime.async(function UpdateShipperInformation$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = 'shippers/updateShipper';
          params = {
            id: id
          };
          body = {
            status: status
          };
          _context7.next = 7;
          return regeneratorRuntime.awrap(axiosInstance.patch(url, {
            params: params
          }, body));

        case 7:
          return _context7.abrupt("return", _context7.sent);

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          throw _context7.t0;

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.UpdateShipperInformation = UpdateShipperInformation;

var UpdateShipperReview = function UpdateShipperReview(id, data) {
  var axiosInstance, url, params;
  return regeneratorRuntime.async(function UpdateShipperReview$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          axiosInstance = (0, _AxiosInstance["default"])();
          url = 'reviews/updateReview?id=663f0573a412374d78c3a40f';
          params = {
            id: id
          }; // const body = {
          //     description: description,
          //     rating: rating
          // }

          _context8.next = 6;
          return regeneratorRuntime.awrap(axiosInstance.patch(url, data));

        case 6:
          return _context8.abrupt("return", _context8.sent);

        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          throw _context8.t0;

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.UpdateShipperReview = UpdateShipperReview;