import React, {useState} from 'react';
import { Datagrid } from 'react-admin';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from '@palustris/react-images';

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

    const openLightbox = (event, firstImage) => {
        setCurrentImage(firstImage);
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
                                  currentIndex={currentImage}
                                  styles={{ view: (base, state) => ({ ...base, height: "90vh" }) }}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </React.Fragment>
    );

}

LightboxGrid.propTypes = {
    imageSource: PropTypes.string.isRequired, // The name of the field that contains the url of the image
};
