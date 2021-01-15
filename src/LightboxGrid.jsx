import React, {useState} from 'react';
import Lightbox from 'react-images';
import { Datagrid } from 'react-admin';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';

export function LightboxGrid(props)
{

    const [images, setImages] = useState([]);
    const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    let imgField = "";

    const onClick = (event) => {
        event.stopPropagation();

        const imgNum = getShownRecords().findIndex(record => (record[imgField] === event.target.src));

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
        return Object.entries(getShownRecords()).map(record => ({src: record[1][props.imageSource]}));
    };

    const {
        imageSource,
        ...rest
    } = props;

    const wrappedChildren = React.Children.map(props.children, c => {
        if (c.type.name && c.type.name === 'ImageField') {
            const rv = React.cloneElement(c, {onClick: onClick});
            // Save the source-field of the ImageField, to be used later
            imgField = rv.props.source;
            return rv;
        }
        return c;
    });

    const openLightbox = (event, currentImage) => {
        console.log("Opening lightbox");
        setCurrentImage(currentImage);
        setImages(getImages());
        setLightboxIsOpen(true);
    };

    const closeLightbox = () => {
        setCurrentImage(0);
        setLightboxIsOpen(false);
    };


    return (
        <React.Fragment>

            <Datagrid {...rest}>
                {wrappedChildren}
            </Datagrid>

            <ModalGateway>
                {lightboxIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel views={images}
                                  currentImage={currentImage}
                                  styles={{ view: (base, state) => ({ ...base, height: "90vh" }) }}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>

            {/*
            <Lightbox images={images}
                      isOpen={lightboxIsOpen}
                      currentImage={currentImage}
                      onClose={closeLightbox}
                      onClickPrev={gotoPrevious}
                      onClickNext={gotoNext}
                      backdropClosesModal={true}
            />
*/}
        </React.Fragment>
    );

}

export function origLightboxGrid(props) {
    const [images, setImages] = useState([]);
    const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    let imgField = "";

    const openLightbox = (event, currentImage) => {
        setCurrentImage(currentImage);
        setImages(getImages());
        setLightboxIsOpen(true);
    };

    const closeLightbox = () => {
        setCurrentImage(0);
        setLightboxIsOpen(false);
    };

    const gotoPrevious = () => {
        setCurrentImage(currentImage - 1);
    };

    const gotoNext = () => {
        setCurrentImage(currentImage + 1);
    };

    const onClick = (event) => {
        event.stopPropagation();

        const imgNum = getShownRecords().findIndex(record => (record[imgField] === event.target.src));

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
        return Object.entries(getShownRecords()).map(record => ({src: record[1][props.imageSource]}));
    };

    const {
        imageSource,
        ...rest
    } = props;

    const wrappedChildren = React.Children.map(props.children, c => {
        if (c.type.name && c.type.name === 'ImageField') {
            const rv = React.cloneElement(c, {onClick: onClick});
            // Save the source-field of the ImageField, to be used later
            imgField = rv.props.source;
            return rv;
        }
        return c;
    });

    return (
        <React.Fragment>

            <Datagrid {...rest}>
                {wrappedChildren}
            </Datagrid>

            <Lightbox images={images}
                      isOpen={lightboxIsOpen}
                      currentImage={currentImage}
                      onClose={closeLightbox}
                      onClickPrev={gotoPrevious}
                      onClickNext={gotoNext}
                      backdropClosesModal={true}
            />

        </React.Fragment>
    );
}

LightboxGrid.propTypes = {
    imageSource: PropTypes.string.isRequired,
};
