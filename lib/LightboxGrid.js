'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LightboxGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var _reactAdmin = require('react-admin');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LightboxGrid = exports.LightboxGrid = function (_Component) {
    _inherits(LightboxGrid, _Component);

    function LightboxGrid(props) {
        _classCallCheck(this, LightboxGrid);

        var _this = _possibleConstructorReturn(this, (LightboxGrid.__proto__ || Object.getPrototypeOf(LightboxGrid)).call(this, props));

        _this.state = {
            images: [],
            lightboxIsOpen: false,
            currentImage: 0
        };
        _this.imgField = "";

        _this.getShownRecords = function () {
            var _this$props = _this.props,
                ids = _this$props.ids,
                data = _this$props.data;


            return ids.map(function (id, rowIndex) {
                return data[id];
            });
        };

        _this.getImages = function () {
            return Object.entries(_this.getShownRecords()).map(function (record) {
                return { src: record[1][_this.props.imageSource] };
            });
        };

        _this.onClick = _this.onClick.bind(_this);
        _this.closeLightbox = _this.closeLightbox.bind(_this);
        _this.openLightbox = _this.openLightbox.bind(_this);
        _this.gotoNext = _this.gotoNext.bind(_this);
        _this.gotoPrevious = _this.gotoPrevious.bind(_this);
        return _this;
    }

    _createClass(LightboxGrid, [{
        key: 'openLightbox',
        value: function openLightbox(event, currentImage) {
            this.setState({
                currentImage: currentImage,
                images: this.getImages(),
                lightboxIsOpen: true
            });
        }
    }, {
        key: 'closeLightbox',
        value: function closeLightbox() {
            this.setState({
                currentImage: 0,
                lightboxIsOpen: false
            });
        }
    }, {
        key: 'gotoPrevious',
        value: function gotoPrevious() {
            this.setState({
                currentImage: this.state.currentImage - 1
            });
        }
    }, {
        key: 'gotoNext',
        value: function gotoNext() {
            this.setState({
                currentImage: this.state.currentImage + 1
            });
        }
    }, {
        key: 'onClick',
        value: function onClick(event) {
            var _this2 = this;

            event.stopPropagation();

            var imgNum = this.getShownRecords().findIndex(function (record) {
                return record[_this2.imgField] === event.target.src;
            });

            this.openLightbox(event, imgNum);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                imageSource = _props.imageSource,
                props = _objectWithoutProperties(_props, ['imageSource']);

            var wrappedChildren = _react2.default.Children.map(this.props.children, function (c) {
                if (c.type.Naked && c.type.Naked.name === 'ImageField') {
                    var rv = _react2.default.cloneElement(c, { onClick: _this3.onClick });
                    // Save the source-field of the ImageField, to be used later
                    _this3.imgField = rv.props.source;
                    return rv;
                }

                return c;
            });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactAdmin.Datagrid,
                    props,
                    wrappedChildren
                ),
                _react2.default.createElement(_reactImages2.default, { images: this.state.images,
                    isOpen: this.state.lightboxIsOpen,
                    currentImage: this.state.currentImage,
                    onClose: this.closeLightbox,
                    onClickPrev: this.gotoPrevious,
                    onClickNext: this.gotoNext,
                    backdropClosesModal: true
                })
            );
        }
    }]);

    return LightboxGrid;
}(_react.Component);

LightboxGrid.propTypes = {
    imageSource: _propTypes2.default.string.isRequired
};