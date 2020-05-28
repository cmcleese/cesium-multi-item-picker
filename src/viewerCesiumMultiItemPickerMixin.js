import { defined, DeveloperError, wrapFunction } from 'cesium'
import CesiumMultiItemPicker from './CesiumMultiItemPicker'
/**
 * A mixin which adds deeper ellipsoid position picking capabilities.
 * The viewer should be extended to include this mixin.
 *
 * @exports viewerCesiumMultiItemPickerMixin
 *
 * @param   {Viewer}  viewer   The viewer instance.
 *
 * @exception {DeveloperError} viewer is required.
 * @exception {DeveloperError} cesiumMultiItemPicker is already defined by another mixin.
 *
 * @example
 * // Add multi item picker support to viewer.
 * var viewer = new Cesium.Viewer('cesiumContainer')
 * viewer.extend(cesiumMultiItemPicker)
 * viewer.cesiumMultiItemPicker.onPicked.addEventListener(picked => {
 *   console.log(picked)
 * }, this)
 */
function viewerCesiumMultiItemPickerMixin (viewer) {
  if (!defined(viewer)) {
    throw new DeveloperError('viewer is required.')
  }
  if (Object.prototype.hasOwnProperty.call(viewer, 'cesiumMultiItemPicker')) {
    throw new DeveloperError('cesiumMultiItemPicker is already defined by another mixin.')
  }

  const cesiumMultiItemPicker = new CesiumMultiItemPicker(
    viewer
  )

  Object.defineProperties(viewer, {
    cesiumMultiItemPicker: {
      get: () => {
        return cesiumMultiItemPicker
      }
    }
  })

  viewer.destroy = wrapFunction(viewer, viewer.destroy, () => {
    viewer.cesiumMultiItemPicker.destroy()
  })
}

export default viewerCesiumMultiItemPickerMixin
