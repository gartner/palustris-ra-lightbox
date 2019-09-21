"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightboxGrid = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactImages = _interopRequireDefault(require("react-images"));

var _reactAdmin = require("react-admin");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LightboxGrid =
/*#__PURE__*/
function (_Component) {
  _inherits(LightboxGrid, _Component);

  function LightboxGrid(props) {
    var _this;

    _classCallCheck(this, LightboxGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LightboxGrid).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      images: [],
      lightboxIsOpen: false,
      currentImage: 0
    });

    _defineProperty(_assertThisInitialized(_this), "imgField", "");

    _defineProperty(_assertThisInitialized(_this), "getShownRecords", function () {
      var _this$props = _this.props,
          ids = _this$props.ids,
          data = _this$props.data;
      return ids.map(function (id, rowIndex) {
        return data[id];
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getImages", function () {
      return Object.entries(_this.getShownRecords()).map(function (record) {
        return {
          src: record[1][_this.props.imageSource]
        };
      });
    });

    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.closeLightbox = _this.closeLightbox.bind(_assertThisInitialized(_this));
    _this.openLightbox = _this.openLightbox.bind(_assertThisInitialized(_this));
    _this.gotoNext = _this.gotoNext.bind(_assertThisInitialized(_this));
    _this.gotoPrevious = _this.gotoPrevious.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LightboxGrid, [{
    key: "openLightbox",
    value: function openLightbox(event, currentImage) {
      this.setState({
        currentImage: currentImage,
        images: this.getImages(),
        lightboxIsOpen: true
      });
    }
  }, {
    key: "closeLightbox",
    value: function closeLightbox() {
      this.setState({
        currentImage: 0,
        lightboxIsOpen: false
      });
    }
  }, {
    key: "gotoPrevious",
    value: function gotoPrevious() {
      this.setState({
        currentImage: this.state.currentImage - 1
      });
    }
  }, {
    key: "gotoNext",
    value: function gotoNext() {
      this.setState({
        currentImage: this.state.currentImage + 1
      });
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      var _this2 = this;

      event.stopPropagation();
      var imgNum = this.getShownRecords().findIndex(function (record) {
        return record[_this2.imgField] === event.target.src;
      });
      this.openLightbox(event, imgNum);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          imageSource = _this$props2.imageSource,
          props = _objectWithoutProperties(_this$props2, ["imageSource"]);

      var wrappedChildren = _react["default"].Children.map(this.props.children, function (c) {
        if (c.type.Naked && c.type.Naked.name === 'ImageField') {
          var rv = _react["default"].cloneElement(c, {
            onClick: _this3.onClick
          }); // Save the source-field of the ImageField, to be used later


          _this3.imgField = rv.props.source;
          return rv;
        }

        return c;
      });

      return _react["default"].createElement("div", null, _react["default"].createElement(_reactAdmin.Datagrid, props, wrappedChildren), _react["default"].createElement(_reactImages["default"], {
        images: this.state.images,
        isOpen: this.state.lightboxIsOpen,
        currentImage: this.state.currentImage,
        onClose: this.closeLightbox,
        onClickPrev: this.gotoPrevious,
        onClickNext: this.gotoNext,
        backdropClosesModal: true
      }));
    }
  }]);

  return LightboxGrid;
}(_react.Component);

exports.LightboxGrid = LightboxGrid;

_defineProperty(LightboxGrid, "propTypes", {
  imageSource: _propTypes["default"].string.isRequired
});