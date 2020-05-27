import {
  defined,
  DeveloperError,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Event,
  Cartesian2
} from 'cesium'

export default class CesiumMultiItemPicker {
  constructor(viewer) {
    if (!defined(viewer)) {
      throw new DeveloperError('viewer is required.')
    }
    // set references
    // the viewer instance
    this._viewer = viewer
    // picked items list
    this.pickedList = []
    // The event raised when an entity or imagery layer is selected.
    this.onPicked = new Event()
    // track the last mouse down position
    this.lastMouseDownPos = Cartesian2.ZERO

    // initialize the handler
    this.init()
  }

  /**
   * Initialize the mouse handler events and picker.
   */
  init() {
    // create mouse handler
    this.mouseHandler = new ScreenSpaceEventHandler(this._viewer.scene.canvas)

    // create the callback for mouse left down
    this.mouseHandler.setInputAction(
      // track the last mouse down position
      mouse => {
        this.lastMouseDownPos = mouse.position
      },
      ScreenSpaceEventType.LEFT_DOWN
    )

    // create the callback for mouse left up
    this.mouseHandler.setInputAction(
      mousePicker.bind(this),
      ScreenSpaceEventType.LEFT_UP
    )
  }

  /**
   * Destory the mouse handler.
   */
  destroy() {
    this.mouseHandler && this.mouseHandler.destroy()
  }
}

/**
 * The method called when a position is selected from the mouse event.
 *
 * @param   {Object}  mouse  The mouse position object (Cartesian2).
 *
 * @return  {Boolean|Event}  The event raised or cancelled event.
 *                           Args passed is array of: [{Entity}, {ImageryLayerFeatureInfo}]
 */
async function mousePicker(mouse) {
  const mousePos = mouse.position
  // if the current position contains Cartesian coordiantes then the position is on the globe
  // and if the last mouse down position matches the mouse up position (not clicking and dragging)
  if (this.lastMouseDownPos.equals(mousePos) && isCartesian.call(this, mousePos)) {
    // reset the picked list
    this.pickedList = []
    // if there are any enabled imagery layers aside from the basemap layer
    if (this._viewer.scene.imageryLayers.length > 1) {
      // get any possible imagery layer features at the provided position coordinates
      const imageryLayerFeatures = await getImageryLayerFeatures.call(this, mousePos)
      // if imagery layer features are present
      if (imageryLayerFeatures.length) {
        // store the imagery layers feature info
        this.pickedList = this.pickedList.concat(imageryLayerFeatures)
      }
    }

    // look for any enties at the provided position coordinates
    const pickedEntities = this._viewer.scene.drillPick(mousePos)
    // if there are entities found
    if (pickedEntities.length) {
      // extract and store the picked entities only
      this.pickedList = this.pickedList.concat(pickedEntities.map(x => x.id))
    }
    // if there items picked and found, raise the event and pass the 
    // pickedList as a combination of: [{Entity}, {ImageryLayerFeatureInfo}]
    return this.pickedList.length && this.onPicked.raiseEvent(this.pickedList)
  }
  // no matching positions or not clicking on map
  return false
}

/**
 * Get imagery layer feature info.
 *
 * @param   {Cartesian2}  position  The position for lookup.
 *
 * @return  {Array}                 The array of features.
 */
async function getImageryLayerFeatures(position) {
  // get the ray for lookup
  const pickRay = this._viewer.camera.getPickRay(position)
  // look for imagery layer features at provided ray
  const featuresPromise = await this._viewer.imageryLayers.pickImageryLayerFeatures(
    pickRay,
    this._viewer.scene
  )
  // filter any found features that only include feature info properties
  const filteredFeatures = featuresPromise.filter(x => {
    return x.properties && Object.getOwnPropertyNames(x.properties).length
  })
  // return the filtered features
  return filteredFeatures
}

/**
 * Check to see if the provided position is in fact on the ellipsoid (globe).
 *
 * @param   {Cartesian2}  position  The position for verification.
 *
 * @return  {Cartesian3}            The found position on the ellipsoid.
 */
function isCartesian(position) {
  return this._viewer.camera.pickEllipsoid(
    position,
    this._viewer.scene.globe.ellipsoid
  )
}
