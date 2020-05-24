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
```
Subscribe to the `onPicked` event.
```js
const viewer = new Cesium.Viewer('cesiumContainer')
viewer.extend(CesiumMultiItemPickerMixin)
viewer.CesiumMultiItemPickerMixin.onPicked.addEventListener((picked) => {
    // output ex: [ {Entity}, {Entity}, {ImageryLayerFeatureInfo} ]
    console.log(picked)
, this)
 ```
## Methods
### Destroy
Destroys the mixin.
__Note:__
The destroy method also gets called automatically when calling `viewer.destroy()`.
So it's not entirely necessary to call this method.

__Example__
```js
viewer.CesiumMultiItemPickerMixin.destroy()
```

## Events
### onPicked
Fired when a `left mouse up` event is triggered on the Cesium Ellipsoid.
This also works on mobile touch.
See [Cesium.ScreenSpaceEventType.LEFT_UP](https://cesium.com/docs/cesiumjs-ref-doc/ScreenSpaceEventType.html?classFilter=scree#.LEFT_UP)

__Arguments__
- `none`

__Returns__
- `[Array]`
Types: [Entity](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html?classFilter=entity) , [ImageryLayerFeatureInfo](https://cesium.com/docs/cesiumjs-ref-doc/ImageryLayerFeatureInfo.html?classFilter=feature)
Ex: `[ {Entity}, {Entity}, {ImageryLayerFeatureInfo} ]`

__Example__

```js
viewer.CesiumMultiItemPickerMixin.onPicked.addEventListener((picked) => {
    // output ex: [ {Entity}, {Entity}, {ImageryLayerFeatureInfo} ]
    console.log(picked)
, this)
```

## [License](./LICENSE)