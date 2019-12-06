'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.LightboxGrid = LightboxGrid;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var _reactAdmin = require('react-admin');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function LightboxGrid(props) {
    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        images = _useState2[0],
        setImages = _useState2[1];

    var _useState3 = (0, _react.useState)(false),
        _useState4 = _slicedToArray(_useState3, 2),
        lightboxIsOpen = _useState4[0],
        setLightboxIsOpen = _useState4[1];

    var _useState5 = (0, _react.useState)(0),
        _useState6 = _slicedToArray(_useState5, 2),
        currentImage = _useState6[0],
        setCurrentImage = _useState6[1];

    var imgField = "";

    var openLightbox = function openLightbox(event, currentImage) {
        setCurrentImage(currentImage);
        setImages(getImages());
        setLightboxIsOpen(true);
    };

    var closeLightbox = function closeLightbox() {
        setCurrentImage(0);
        setLightboxIsOpen(false);
    };

    var gotoPrevious = function gotoPrevious() {
        setCurrentImage(currentImage - 1);
    };

    var gotoNext = function gotoNext() {
        setCurrentImage(currentImage + 1);
    };

    var onClick = function onClick(event) {
        event.stopPropagation();

        var imgNum = getShownRecords().findIndex(function (record) {
            return record[imgField] === event.target.src;
        });

        openLightbox(event, imgNum);
    };

    var getShownRecords = function getShownRecords() {
        var ids = props.ids,
            data = props.data;


        return ids.map(function (id, rowIndex) {
            return data[id];
        });
    };

    var getImages = function getImages() {
        return Object.entries(getShownRecords()).map(function (record) {
            return { src: record[1][props.imageSource] };
        });
    };

    var imageSource = props.imageSource,
        rest = _objectWithoutProperties(props, ['imageSource']);

    var wrappedChildren = _react2.default.Children.map(props.children, function (c) {
        if (c.type.name && c.type.name === 'ImageField') {
            var rv = _react2.default.cloneElement(c, { onClick: onClick });
            // Save the source-field of the ImageField, to be used later
            imgField = rv.props.source;
            return rv;
        }
        return c;
    });

    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            _reactAdmin.Datagrid,
            rest,
            wrappedChildren
        ),
        _react2.default.createElement(_reactImages2.default, { images: images,
            isOpen: lightboxIsOpen,
            currentImage: currentImage,
            onClose: closeLightbox,
            onClickPrev: gotoPrevious,
            onClickNext: gotoNext,
            backdropClosesModal: true
        })
    );
}

LightboxGrid.propTypes = {
    imageSource: _propTypes2.default.string.isRequired
};