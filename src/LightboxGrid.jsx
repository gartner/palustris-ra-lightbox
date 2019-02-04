import React, {Component} from 'react';
import Lightbox from 'react-images';
import { Datagrid } from 'react-admin';
import PropTypes from 'prop-types';

export class LightboxGrid extends Component {
    static propTypes = {
        imageSource: PropTypes.string.isRequired,
    };

    state = {
        images: [],
        lightboxIsOpen: false,
        currentImage: 0,
    };

    imgField = "";

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    openLightbox(event, currentImage) {
        this.setState({
            currentImage: currentImage,
            images: this.getImages(),
            lightboxIsOpen: true,
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    onClick(event) {
        event.stopPropagation();

        const imgNum = this.getShownRecords().findIndex(record => (record[this.imgField] === event.target.src));

        this.openLightbox(event, imgNum);

    }

    getShownRecords = () => {
        const {
            ids,
            data
        } = this.props;

        return ids.map((id, rowIndex) => data[id]);
    }

    getImages = () => {
        return Object.entries(this.getShownRecords()).map(record => ({src: record[1][this.props.imageSource]}));
    };

    render() {
        const {
            imageSource,
            ...props
        } = this.props;

        const wrappedChildren = React.Children.map(this.props.children, c => {
            if (c.type.Naked && c.type.Naked.name === 'ImageField') {
                const rv = React.cloneElement(c, {onClick: this.onClick});
                // Save the source-field of the ImageField, to be used later
                this.imgField = rv.props.source;
                return rv;
            }

            return c;
        });

        return (
            <div>
                <Datagrid {...props}>
                    {wrappedChildren}
                </Datagrid>
                <Lightbox images={this.state.images}
                          isOpen={this.state.lightboxIsOpen}
                          currentImage={this.state.currentImage}
                          onClose={this.closeLightbox}
                          onClickPrev={this.gotoPrevious}
                          onClickNext={this.gotoNext}
                          backdropClosesModal={true}
                />
            </div>
        );
    }
}
