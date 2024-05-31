"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takePhoto = exports.handleConfirmCancel = exports.handleShipperDecision = exports.fetchRouteCustomer = exports.fetchRoute = exports.fetchOrder = void 0;

var _react = require("react");

var _ShipperHTTP = require("../ShipperHTTP");

var _axios = _interopRequireDefault(require("axios"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var GOONG_API_KEY = 'IaCWfNwZedduRhoohVxatXxl5nhVbKXTa3ojVBV7';

var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    imageCheck = _useState2[0],
    setImageCheck = _useState2[1];

var fetchOrder = function fetchOrder(id, idUser, setOrder, setModalVisible, setIsTimerRunning) {
  var result;
  return regeneratorRuntime.async(function fetchOrder$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _ShipperHTTP.GetOrderByID)(id));

        case 3:
          result = _context.sent;
          setOrder(result);

          if (!result.result) {
            _context.next = 10;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap((0, _ShipperHTTP.UpdateShipperInformation)(idUser, 8));

        case 8:
          setModalVisible(true);
          setIsTimerRunning(true);

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log('Error fetching order:', _context.t0);
          throw _context.t0;

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.fetchOrder = fetchOrder;

var decodePolyline = function decodePolyline(encoded) {
  var poly = [];
  var index = 0,
      len = encoded.length;
  var lat = 0,
      lng = 0;

  while (index < len) {
    var b = void 0,
        shift = 0,
        result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    var dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    var dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;
    var p = {
      latitude: lat / 1e5,
      longitude: lng / 1e5
    };
    poly.push(p);
  }

  return poly;
};

var fetchRoute = function fetchRoute(locateCurrent, destination, setRouteCoordinates, setDistance, setDuration) {
  var response, routes, points, coordinates;
  return regeneratorRuntime.async(function fetchRoute$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(locateCurrent && destination)) {
            _context2.next = 13;
            break;
          }

          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("https://rsapi.goong.io/Direction", {
            params: {
              origin: "".concat(locateCurrent.latitude, ",").concat(locateCurrent.longitude),
              destination: "".concat(destination.latitude, ",").concat(destination.longitude),
              vehicle: 'bike',
              api_key: GOONG_API_KEY
            }
          }));

        case 4:
          response = _context2.sent;
          routes = response.data.routes;

          if (routes && routes.length > 0) {
            points = routes[0].overview_polyline.points;
            coordinates = decodePolyline(points);
            setRouteCoordinates(coordinates);
            setDistance(routes[0].legs[0].distance.text);
            setDuration(routes[0].legs[0].duration.text);
          }

          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          console.log('83');

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.fetchRoute = fetchRoute;

var fetchRouteCustomer = function fetchRouteCustomer(destination, destinationCustomer, setRouteCoordinatesCustomer, setDistanceCustomer, setDurationCustomer) {
  var response, routes, points, coordinates;
  return regeneratorRuntime.async(function fetchRouteCustomer$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(destinationCustomer && destination)) {
            _context3.next = 13;
            break;
          }

          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("https://rsapi.goong.io/Direction", {
            params: {
              origin: "".concat(destination.latitude, ",").concat(destination.longitude),
              destination: "".concat(destinationCustomer.lat, ",").concat(destinationCustomer.lng),
              vehicle: 'bike',
              api_key: GOONG_API_KEY // Sử dụng biến môi trường

            }
          }));

        case 4:
          response = _context3.sent;
          routes = response.data.routes;

          if (routes && routes.length > 0) {
            points = routes[0].overview_polyline.points;
            coordinates = decodePolyline(points);
            setRouteCoordinatesCustomer(coordinates);
            setDistanceCustomer(routes[0].legs[0].distance.text);
            setDurationCustomer(routes[0].legs[0].duration.text);
          }

          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          console.log('110');

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 9]]);
}; // // Show Bottom Sheet
// export const handlePresentPress = useCallback(
//   (bottomSheetRef, setIsBottomSheetVisible) => {
//     bottomSheetRef.current?.expand();
//     setIsBottomSheetVisible(true);
//   },
//   [],
// );
// // Hide Bottom Sheet
// export const handleClosePress = useCallback(
//   (bottomSheetRef, setIsBottomSheetVisible) => {
//     bottomSheetRef.current?.close();
//     setIsBottomSheetVisible(false);
//   },
//   [],
// );


exports.fetchRouteCustomer = fetchRouteCustomer;

var handleShipperDecision = function handleShipperDecision(id, status, order, idUser, setDestination, setQuery, setModalVisible, setModalVisibleConfirm, setIsTimerRunning, setCountdown, setOrder, handlePresentPress, updateOrderStatus) {
  return regeneratorRuntime.async(function handleShipperDecision$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (!(status === 3)) {
            _context4.next = 15;
            break;
          }

          setDestination({
            latitude: order.merchantID.latitude,
            longitude: order.merchantID.longitude
          });
          setQuery("".concat(order.deliveryAddress));
          setModalVisible(false);
          setModalVisibleConfirm(false);
          setIsTimerRunning(false);
          setCountdown(60);
          handlePresentPress();
          _context4.next = 11;
          return regeneratorRuntime.awrap(updateOrderStatus(id, 3));

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap((0, _ShipperHTTP.UpdateShipperInformation)(idUser, 6));

        case 13:
          _context4.next = 28;
          break;

        case 15:
          if (!(status === 5)) {
            _context4.next = 27;
            break;
          }

          setModalVisible(false);
          setModalVisibleConfirm(false);
          setOrder(null);
          setIsTimerRunning(false);
          setCountdown(60);
          _context4.next = 23;
          return regeneratorRuntime.awrap(updateOrderStatus(id, 5));

        case 23:
          _context4.next = 25;
          return regeneratorRuntime.awrap((0, _ShipperHTTP.UpdateShipperInformation)(idUser, 7));

        case 25:
          _context4.next = 28;
          break;

        case 27:
          console.warn('Lựa chọn không hợp lệ');

        case 28:
          _context4.next = 33;
          break;

        case 30:
          _context4.prev = 30;
          _context4.t0 = _context4["catch"](0);
          console.error('Error handling shipper decision:', _context4.t0);

        case 33:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 30]]);
};

exports.handleShipperDecision = handleShipperDecision;

var handleConfirmCancel = function handleConfirmCancel( //   image,
handleClosePress, setIndex, setOrder, translateX, navigation, id, updateOrderStatus) {
  var data;
  return regeneratorRuntime.async(function handleConfirmCancel$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          data = {
            imageGiveFood: imageCheck
          };
          console.log(imageCheck);
          _context5.prev = 2;

          if (!imageCheck) {
            _context5.next = 16;
            break;
          }

          handleClosePress();
          setIndex(0);
          _context5.next = 8;
          return regeneratorRuntime.awrap(updateOrderStatus(id, 5));

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap((0, _ShipperHTTP.UpdateOrder)(id, data));

        case 10:
          setOrder(null);
          translateX.setValue(0);
          navigation.navigate('SuccessOrder');
          setTimeout(function () {
            navigation.navigate('SubmitReview', {
              id: id
            });
          }, 5000);
          _context5.next = 18;
          break;

        case 16:
          setIndex(3);

          _reactNative.Alert.alert('Phải chụp hình ảnh');

        case 18:
          _context5.next = 24;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](2);
          console.log(_context5.t0);
          throw _context5.t0;

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 20]]);
};

exports.handleConfirmCancel = handleConfirmCancel;

var takePhoto = function takePhoto(response, setImage) {
  var asset, formData, result;
  return regeneratorRuntime.async(function takePhoto$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!response.didCancel) {
            _context6.next = 2;
            break;
          }

          return _context6.abrupt("return");

        case 2:
          if (!response.errorCode) {
            _context6.next = 5;
            break;
          }

          console.error('ImagePicker Error: ', response.errorCode);
          return _context6.abrupt("return");

        case 5:
          if (!response.errorMessage) {
            _context6.next = 8;
            break;
          }

          console.error('ImagePicker Error: ', response.errorMessage);
          return _context6.abrupt("return");

        case 8:
          if (!(response.assets && response.assets.length > 0)) {
            _context6.next = 24;
            break;
          }

          asset = response.assets[0];
          formData = new FormData();
          formData.append('file', {
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName
          });
          _context6.prev = 12;
          _context6.next = 15;
          return regeneratorRuntime.awrap((0, _ShipperHTTP.uploadImage)(formData));

        case 15:
          result = _context6.sent;
          setImage(result.url);
          setImageCheck(result.url);
          console.log(result.url);
          _context6.next = 24;
          break;

        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](12);
          console.error('Error uploading image:', _context6.t0);

        case 24:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[12, 21]]);
};

exports.takePhoto = takePhoto;