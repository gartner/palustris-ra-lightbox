import React, { useState } from 'react';
import { Datagrid, SingleFieldList, useListContext, useChoicesContext } from 'react-admin';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from '@palustris/react-images';
export function LightboxGrid(props) {
  const {
    data,
    isLoading
  } = useListContext();
  const [images, setImages] = useState([]);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const {
    imageSource,
    type,
    ...rest
  } = props;

  if (isLoading) {
    return null;
  } // Store the name of the 'source'-prop from the child ImageField


  let imageFieldSource = "";

  const onClick = event => {
    event.stopPropagation();
    const imgNum = data.findIndex(record => record[imageFieldSource] === event.target.src);
    openLightbox(event, imgNum);
  };

  const getImages = () => {
    const images = data.map(record => ({ ...record,
      src: record[imageSource]
    }));

    if (!images) {
      return [];
    }

    return images;
  };

  const wrappedChildren = React.Children.map(props.children, c => {
    if (c && c.type.name && c.type.name === 'ImageField') {
      const rv = /*#__PURE__*/React.cloneElement(c, {
        onClick: onClick
      }); // Save the source-field of the ImageField, to be used later

      imageFieldSource = rv.props.source; // console.log(imgField);

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

  return /*#__PURE__*/React.createElement(React.Fragment, null, (() => {
    if (type === 'list') {
      return /*#__PURE__*/React.createElement(SingleFieldList, {
        linkType: false
      }, wrappedChildren[0]);
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