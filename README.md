# `<LightboxGrid>` for admin-on-rest

<LightboxGrid> component for react-admin, that will add a Lightbox to all imagefields in the grid.

It will wrap a click-handler on all the images in the list, which will open the Lightbox. It returns just a DataGrid for the list.

## Installation

```sh
npm install @palustris/ra-lightboxgrid --save
```

or 

```sh
yarn add @palustris/ra-lightboxgrid
```

## Usage

```js
import {List, ImageField, TextField} from 'react-admin';
import {LightboxGrid} from '@palustris/ra-lightboxgrid;

export const ImageList = props => ( 
    <List {...props}>
        <LightboxGrid rowClick="edit" imageSource="path">
            <ImageField source="thumbnail" title="titel" />
            <TextField source="titel" />
        </LightboxGrid>
    </List>
);

```

The LightboxGrid takes all the props that a Datagrid does. It requires one prop for its own use: 'imageSource'. This is the field from the resource-record, that gives the url to the fullsize image to display.

(In my use case, the api return a url for both a thumbnail and the full size image. I display the thumbnail in the Datagrid, and the full size image in the Lightbox).


## License

This library is licensed under the [MIT Licence](LICENSE)
