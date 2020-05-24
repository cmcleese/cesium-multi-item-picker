# cesium-multi-item-picker

Simple multi item picker for Cesium.

This add the ability to drill pick any entities or imagery layers based on the cursor position on the map.
What is then returned is an array with the entities and/or the imagery layer feature info.

## Install
`yarn add cesium-multi-item-picker`
or
`npm install cesium-multi-item-picker`

## Usage
### Init
```js

import CesiumMultiItemPickerMixin from 'cesium-multi-item-picker'

const viewer = new Cesium.Viewer('cesiumContainer')
viewer.extend(CesiumMultiItemPickerMixin)
viewer.CesiumMultiItemPickerMixin.onPicked.addEventListener((picked) => {
    // output ex: [ {Entity}, {Entity}, {ImageryLayerFeatureInfo} ]
    console.log(picked)
, this)
 ```
### Destroy
```js
viewer.CesiumMultiItemPickerMixin.destroy()
```
## [License](./LICENSE)