function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Datagrid, SingleFieldList, useListContext, useChoicesContext } from 'react-admin';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from '@palustris/react-images';
export function LightboxGrid(props) {
  const {
    data,
    isLoading,
    ...list
  } = useListContext();
  const {
    allChoices,
    ...choc
  } = useChoicesContext();
  const [images, setImages] = useState([]);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  if (isLoading) {
    return null;
  }

  console.log(allChoices);
  console.log(data);
  return /*#__PURE__*/React.createElement("div", null);
  let imgField = "";

  const onClick = event => {
    event.stopPropagation();
    const imgNum = getShownRecords().findIndex(record => record[imgField] === event.target.src);
    openLightbox(event, imgNum);
  };

  const getShownRecords = () => {
    const {
      ids,
      data
    } = props;
    return ids.map((id, rowIndex) => data[id]);
  };

  const getImages = () => {
    const images = Object.entries(getShownRecords()).map(record => ({
      src: record[1][props.imageSource]
    }));

    if (!images) {
      return [];
    }

    return images;
  };

  const {
    imageSource,
    type,
    ...rest
  } = props;
  const wrappedChildren = React.Children.map(props.children, c => {
    if (c && c.type.name && c.type.name === 'ImageField') {
      const rv = /*#__PURE__*/React.cloneElement(c, {
        onClick: onClick
      }); // Save the source-field of the ImageField, to be used later

      imgField = rv.props.source;
      return rv;
    }

    return c;
  });

  const openLightbox = (event, firstImage) => {
    setCurrentImage(firstImage);
    setImages(getImages());
    setLightboxIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setLightboxIsOpen(false);
  };

  console.log(rest);
  return /*#__PURE__*/React.createElement(React.Fragment, null, (() => {
    if (type === 'list') {
      return /*#__PURE__*/React.createElement(SingleFieldList, _extends({}, rest, {
        linkType: false
      }), wrappedChildren[0]);
    }

    return /*#__PURE__*/React.createElement(Datagrid, rest, wrappedChildren);
  })(), /*#__PURE__*/React.createElement(ModalGateway, null, lightboxIsOpen ? /*#__PURE__*/React.createElement(Modal, {
    onClose: closeLightbox
  }, /*#__PURE__*/React.createElement(Carousel, {
    views: images,
    currentIndex: currentImage,
    styles: {
      view: (base, state) => ({ ...base,
        height: "90vh"
      })
    }
  })) : null));
}
LightboxGrid.propTypes = {
  imageSource: PropTypes.string.isRequired,
  // The name of the field that contains the url of the image
  type: PropTypes.string
};